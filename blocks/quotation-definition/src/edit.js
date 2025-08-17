import { __ } from '@wordpress/i18n';
import { 
    InspectorControls, 
    RichText,
    PanelColorSettings,
    useBlockProps 
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    RangeControl,
    Button,
    TextControl
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const {
        mainTitle,
        leadText,
        sectionTitle1,
        sectionContent1,
        sectionTitle2,
        sectionContent2,
        stats,
        backgroundColor,
        topPadding,
        bottomPadding
    } = attributes;

    const blockProps = useBlockProps({
        className: 'quotation-definition-section',
        style: {
            paddingTop: `${topPadding}px`,
            paddingBottom: `${bottomPadding}px`,
            backgroundColor: backgroundColor
        }
    });

    const updateStat = (index, field, value) => {
        const newStats = [...stats];
        newStats[index] = {
            ...newStats[index],
            [field]: value
        };
        setAttributes({ stats: newStats });
    };

    const addStat = () => {
        setAttributes({
            stats: [...stats, { number: '0', label: 'New statistic' }]
        });
    };

    const removeStat = (index) => {
        const newStats = stats.filter((_, i) => i !== index);
        setAttributes({ stats: newStats });
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Spacing Settings', 'simple-invoice-generator')}>
                    <RangeControl
                        label={__('Top Padding', 'simple-invoice-generator')}
                        value={topPadding}
                        onChange={(value) => setAttributes({ topPadding: value })}
                        min={0}
                        max={200}
                    />
                    <RangeControl
                        label={__('Bottom Padding', 'simple-invoice-generator')}
                        value={bottomPadding}
                        onChange={(value) => setAttributes({ bottomPadding: value })}
                        min={0}
                        max={200}
                    />
                </PanelBody>
                
                <PanelColorSettings
                    title={__('Color Settings', 'simple-invoice-generator')}
                    colorSettings={[
                        {
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color }),
                            label: __('Background Color', 'simple-invoice-generator')
                        }
                    ]}
                />

                <PanelBody title={__('Statistics', 'simple-invoice-generator')} initialOpen={false}>
                    {stats.map((stat, index) => (
                        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #e0e0e0' }}>
                            <TextControl
                                label={__('Number', 'simple-invoice-generator')}
                                value={stat.number}
                                onChange={(value) => updateStat(index, 'number', value)}
                            />
                            <TextControl
                                label={__('Label', 'simple-invoice-generator')}
                                value={stat.label}
                                onChange={(value) => updateStat(index, 'label', value)}
                            />
                            <Button
                                isDestructive
                                onClick={() => removeStat(index)}
                            >
                                {__('Remove', 'simple-invoice-generator')}
                            </Button>
                        </div>
                    ))}
                    <Button
                        isPrimary
                        onClick={addStat}
                    >
                        {__('Add Statistic', 'simple-invoice-generator')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <RichText
                        tagName="h2"
                        value={mainTitle}
                        onChange={(value) => setAttributes({ mainTitle: value })}
                        placeholder={__('Enter main title...', 'simple-invoice-generator')}
                    />
                    
                    <div className="content-wrapper">
                        <RichText
                            tagName="p"
                            className="lead-text"
                            value={leadText}
                            onChange={(value) => setAttributes({ leadText: value })}
                            placeholder={__('Enter lead text...', 'simple-invoice-generator')}
                        />
                        
                        <div className="content-box">
                            <RichText
                                tagName="h3"
                                value={sectionTitle1}
                                onChange={(value) => setAttributes({ sectionTitle1: value })}
                                placeholder={__('Section title...', 'simple-invoice-generator')}
                            />
                            <RichText
                                tagName="p"
                                value={sectionContent1}
                                onChange={(value) => setAttributes({ sectionContent1: value })}
                                placeholder={__('Section content...', 'simple-invoice-generator')}
                                className="content-paragraph"
                            />
                        </div>

                        <div className="content-box">
                            <RichText
                                tagName="h3"
                                value={sectionTitle2}
                                onChange={(value) => setAttributes({ sectionTitle2: value })}
                                placeholder={__('Section title...', 'simple-invoice-generator')}
                            />
                            <RichText
                                tagName="p"
                                value={sectionContent2}
                                onChange={(value) => setAttributes({ sectionContent2: value })}
                                placeholder={__('Section content...', 'simple-invoice-generator')}
                                className="content-paragraph"
                            />
                        </div>

                        <div className="stats-grid">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-card">
                                    <div className="stat-number">{stat.number}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}