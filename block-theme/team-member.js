const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType('custom/team-member', {
    title: 'Team Member',
    icon: 'groups',
    category: 'common',
    attributes: {
        imageURL: { type: 'string' },
        name: { type: 'string' },
        subtitle: { type: 'string' },
    },
    edit: ({ attributes, setAttributes }) => {
        const { imageURL, name, subtitle } = attributes;

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: '1' }}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ imageURL: media.url })}
                            allowedTypes={['image']}
                            render={({ open }) => (
                                <Button onClick={open} className="button button-large">
                                    {imageURL ? <img src={imageURL} alt="Team Member" style={{ borderRadius: '50%', width: '100px', height: '100px' }} /> : 'Upload Image'}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                </div>
                <div style={{ flex: '2', paddingLeft: '20px' }}>
                    <RichText
                        tagName="h2"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(value) => setAttributes({ name: value })}
                        style={{ fontFamily: 'Roboto, sans-serif', fontSize: '36px', fontWeight: '700' }}
                    />
                    <RichText
                        tagName="h3"
                        placeholder="Enter Subtitle"
                        value={subtitle}
                        onChange={(value) => setAttributes({ subtitle: value })}
                        style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', fontWeight: '500' }}
                    />
                    <Button isSecondary style={{ border: '1px solid #222222', color: '#222222' }}>
                        Toggle
                    </Button>
                </div>
            </div>
        );
    },
    save: () => {
        return null; // Server-side rendering
    },
});
