module.exports = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/quickstart',
        'getting-started/key-concepts',
      ],
    },
    {
      type: 'category',
      label: 'Flows Management',
      items: [
        'flows/creating-flows',
        'flows/creating-modules',
        'flows/creating-tasks',
        'flows/templates',
        'flows/best-practices',
      ],
    },
    {
      type: 'category',
      label: 'Assignments',
      items: [
        'assignments/assigning-flows',
        'assignments/scheduling',
        'assignments/tracking',
      ],
    },
    {
      type: 'category',
      label: 'User Management',
      items: [
        'users/organizations',
        'users/invitations',
      ],
    },
    {
      type: 'category',
      label: 'API Documentation',
      items: [
        'api/overview',
        'api/authentication',
        'api/rate-limits',
        {
          type: 'category',
          label: 'Endpoints',
          items: [
            'api/endpoints/endpoints-overview',
            'api/endpoints/flow-assignment',
            'api/endpoints/flow-reporting',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/overview',
        'integrations/zapier',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/sop-creation',
        'guides/onboarding',
        'guides/training',
      ],
    },
  ],
};
