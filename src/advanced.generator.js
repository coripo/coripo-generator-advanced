const i18next = require('i18next');
const locales = require('../locales/index.js');

const Generator = function Generator(dependencies, config = {}) {
  i18next.init({
    lng: config.locale || 'en',
    fallbackLng: 'en',
    initImmediate: false,
    resources: locales,
  });
  const trl = (key) => {
    i18next.store.data = locales;
    return i18next.t(key);
  };
  const id = 'coripo.coripo.generator.advanced';
  const name = trl('advanced-generator.name');
  const description = trl('advanced-generator.description');
  const inputs = [
    {
      title: trl('advanced-generator.field-group.basic.title'),
      fields: [
        {
          id: 'title',
          label: trl('advanced-generator.field-group.basic.field.title.label'),
          type: 'text',
        },
        {
          id: 'color',
          label: trl('advanced-generator.field-group.basic.field.color.label'),
          type: 'color',
        },
        {
          id: 'icon',
          label: trl('advanced-generator.field-group.basic.field.icon.label'),
          type: 'text',
          comment: trl('advanced-generator.field-group.basic.field.icon.comment'),
        },
        {
          id: 'note',
          label: trl('advanced-generator.field-group.basic.field.note.label'),
          type: 'wysiwyg',
        },
        {
          id: 'since',
          label: trl('advanced-generator.field-group.basic.field.since.label'),
          type: 'date',
          comment: trl('advanced-generator.field-group.basic.field.since.comment'),
        },
        {
          id: 'till',
          label: trl('advanced-generator.field-group.basic.field.till.label'),
          type: 'date',
          comment: trl('advanced-generator.field-group.basic.field.till.comment'),
          optional: true,
        },
      ],
    },
    {
      title: trl('advanced-generator.field-group.repeats.title'),
      fields: [
        {
          id: 'repeats',
          label: trl('advanced-generator.field-group.repeats.field.repeats.label'),
          type: 'repeats',
          optional: true,
        },
      ],
    },
    {
      title: trl('advanced-generator.field-group.sequels.title'),
      fields: [
        {
          id: 'sequels',
          label: trl('advanced-generator.field-group.sequels.field.sequels.label'),
          type: 'sequels',
          optional: true,
        },
      ],
    },
    {
      title: trl('advanced-generator.field-group.overlap-policy.title'),
      fields: [
        {
          id: 'internalOverlap',
          label: trl('advanced-generator.field-group.overlap-policy.field.internal.label'),
          type: 'select',
          data: {
            items: [
              {
                title: trl('advanced-generator.field-group.overlap-policy.field.internal.data.allow'),
                value: 'allow',
              },
              {
                title: trl('advanced-generator.field-group.overlap-policy.field.internal.data.remove'),
                value: 'remove',
              },
              {
                title: trl('advanced-generator.field-group.overlap-policy.field.internal.data.trim'),
                value: 'trim',
              },
            ],
          },
          optional: true,
        },
        {
          id: 'externalOverlap',
          label: trl('advanced-generator.field-group.overlap-policy.field.external.label'),
          type: 'select',
          data: {
            items: [
              {
                title: trl('advanced-generator.field-group.overlap-policy.field.external.data.allow'),
                value: 'allow',
              },
              {
                title: trl('advanced-generator.field-group.overlap-policy.field.external.data.remove'),
                value: 'remove',
              },
              {
                title: trl('advanced-generator.field-group.overlap-policy.field.external.data.remove-forever'),
                value: 'remove-forever',
              },
              {
                title: trl('advanced-generator.field-group.overlap-policy.field.external.data.trim'),
                value: 'trim',
              },
              {
                title: trl('advanced-generator.field-group.overlap-policy.field.external.data.trim-forever'),
                value: 'trim-forever',
              },
            ],
          },
          optional: true,
        },
      ],
    },
  ];
  const helper = {
    getAdapter: dependencies.getAdapter,
    primaryAdapterId: dependencies.primaryAdapterId,
  };

  const generate = (cfg) => {
    const event = new dependencies.Event({
      dna: cfg,
      id: cfg.id,
      generatorId: id,
      title: cfg.title,
      icon: cfg.icon,
      color: cfg.color,
      note: cfg.note,
      since: new dependencies.OneDate(cfg.since, helper),
      till: new dependencies.OneDate((cfg.till || cfg.since), helper),
      categoryId: cfg.categoryId,
      tags: cfg.tags,
      repeats: cfg.repeats,
      sequels: cfg.sequels,
      overlap: {
        internal: cfg.internalOverlap,
        external: cfg.externalOverlap,
      },
    });
    return event;
  };

  return {
    id,
    name,
    description,
    inputs,
    generate,
  };
};

module.exports = Generator;
