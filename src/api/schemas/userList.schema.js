export const usersListSchema = {
  type: "object",
  properties: {
    page: { type: "integer" },
    per_page: { type: "integer" },
    total: { type: "integer" },
    total_pages: { type: "integer" },

    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          email: { type: "string", format: "email" },
          first_name: { type: "string" },
          last_name: { type: "string" },
          avatar: { type: "string", format: "uri" }
        },
        required: ["id", "email", "first_name", "last_name", "avatar"],
        additionalProperties: false
      }
    },

    support: {
      type: "object",
      properties: {
        url: { type: "string", format: "uri" },
        text: { type: "string" }
      },
      required: ["url", "text"],
      additionalProperties: false
    },

    _meta: {
      type: "object",
      properties: {
        powered_by: { type: "string" },
        docs_url: { type: "string", format: "uri" },
        upgrade_url: { type: "string", format: "uri" },
        example_url: { type: "string", format: "uri" },
        variant: { type: "string" },
        message: { type: "string" },

        cta: {
          type: "object",
          properties: {
            label: { type: "string" },
            url: { type: "string", format: "uri" }
          },
          required: ["label", "url"],
          additionalProperties: false
        },

        context: { type: "string" }
      },
      required: [
        "powered_by",
        "docs_url",
        "upgrade_url",
        "example_url",
        "variant",
        "message",
        "cta",
        "context"
      ],
      additionalProperties: false
    }
  },

  required: [
    "page",
    "per_page",
    "total",
    "total_pages",
    "data",
    "support",
    "_meta"
  ],

  additionalProperties: false
};