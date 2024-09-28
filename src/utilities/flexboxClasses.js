/**
 * Defines Flexbox utility classes with their respective CSS properties and values.
 * @returns {Array} - An array of objects representing Flexbox utility classes.
 */
function flexboxClasses() {
    return [
        { class: 'flex', property: 'display', value: 'flex' },
        { class: 'inline-flex', property: 'display', value: 'inline-flex' },
        { class: 'flex-row', property: 'flex-direction', value: 'row' },
        { class: 'flex-row-reverse', property: 'flex-direction', value: 'row-reverse' },
        { class: 'flex-column', property: 'flex-direction', value: 'column' },
        { class: 'flex-column-reverse', property: 'flex-direction', value: 'column-reverse' },
        { class: 'justify-start', property: 'justify-content', value: 'flex-start' },
        { class: 'justify-end', property: 'justify-content', value: 'flex-end' },
        { class: 'justify-center', property: 'justify-content', value: 'center' },
        { class: 'justify-between', property: 'justify-content', value: 'space-between' },
        { class: 'justify-around', property: 'justify-content', value: 'space-around' },
        { class: 'align-start', property: 'align-items', value: 'flex-start' },
        { class: 'align-end', property: 'align-items', value: 'flex-end' },
        { class: 'align-center', property: 'align-items', value: 'center' },
        { class: 'align-baseline', property: 'align-items', value: 'baseline' },
        { class: 'align-stretch', property: 'align-items', value: 'stretch' },
        { class: 'align-self-start', property: 'align-self', value: 'flex-start' },
        { class: 'align-self-end', property: 'align-self', value: 'flex-end' },
        { class: 'align-self-center', property: 'align-self', value: 'center' },
        { class: 'align-self-baseline', property: 'align-self', value: 'baseline' },
        { class: 'align-self-stretch', property: 'align-self', value: 'stretch' },
        { class: 'flex-wrap', property: 'flex-wrap', value: 'wrap' },
        { class: 'flex-nowrap', property: 'flex-wrap', value: 'nowrap' },
        { class: 'flex-wrap-reverse', property: 'flex-wrap', value: 'wrap-reverse' }
    ];
}

module.exports = flexboxClasses;
