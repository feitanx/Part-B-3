import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

registerBlockType('custom/team-members', {
    edit: ({ attributes, setAttributes }) => {
        const { members = [] } = attributes;

        const updateMember = (index, key, value) => {
            const updatedMembers = [...members];
            updatedMembers[index] = { ...updatedMembers[index], [key]: value };
            setAttributes({ members: updatedMembers });
        };

        const addMember = () => {
            setAttributes({ members: [...members, { name: '', position: '', bio: '', imageUrl: '', showBio: false }] });
        };

        return (
            <div className="team-members-block">
                {members.map((member, index) => (
                    <div className="team-member" key={index}>
                        <div className="team-member-image">
                            <MediaUpload
                                onSelect={(media) => updateMember(index, 'imageUrl', media.url)}
                                allowedTypes={['image']}
                                value={member.imageUrl}
                                render={({ open }) => (
                                    <Button onClick={open} className="button button-large">
                                        {member.imageUrl ? (
                                            <img src={member.imageUrl} alt="Team Member" className="circular-image" />
                                        ) : (
                                            'Upload Image'
                                        )}
                                    </Button>
                                )}
                            />
                        </div>
                        <div className="team-member-details">
                            <TextControl
                                label="Name"
                                value={member.name}
                                onChange={(value) => updateMember(index, 'name', value)}
                            />
                            <TextControl
                                label="Position"
                                value={member.position}
                                onChange={(value) => updateMember(index, 'position', value)}
                            />
                            <Button
                                isSecondary
                                onClick={() => updateMember(index, 'showBio', !member.showBio)}
                            >
                                {member.showBio ? 'Hide Bio' : 'Show Bio'}
                            </Button>
                            {member.showBio && (
                                <TextControl
                                    label="Bio"
                                    value={member.bio}
                                    onChange={(value) => updateMember(index, 'bio', value)}
                                />
                            )}
                        </div>
                    </div>
                ))}
                <Button isPrimary onClick={addMember}>
                    Add Team Member
                </Button>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { members = [] } = attributes;
        return (
            <div className="team-members-block">
                {members.map((member, index) => (
                    <div className="team-member" key={index}>
                        <div className="team-member-image">
                            {member.imageUrl && (
                                <img src={member.imageUrl} alt={member.name} className="circular-image" />
                            )}
                        </div>
                        <div className="team-member-details">
                            <h3>{member.name}</h3>
                            <h4>{member.position}</h4>
                            <Button
                                isSecondary
                                onClick={() => {
                                    document
                                        .querySelector(`.bio-${index}`)
                                        .classList.toggle('show');
                                }}
                            >
                                {member.showBio ? 'Hide Bio' : 'Show Bio'}
                            </Button>
                            <p className={`bio bio-${index} ${member.showBio ? 'show' : ''}`}>
                                {member.bio}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
});
