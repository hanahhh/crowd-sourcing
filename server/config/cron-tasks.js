module.exports = {
  "*/1 * * * *": async ({ strapi }) => {
    const date = new Date().toISOString();
    const batches = await strapi.entityService.findMany("api::batch.batch", {
      fields: ["timeExpired"],
      filters: {
        $and: [
          {
            timeExpired: { $lt: date },
          },
          {
            status: { $not: "expired" },
          },
        ],
      },
    });
    batches.forEach(async (batch) => {
      const hits = await strapi.entityService.findMany("api::hit.hit", {
        filters: {
          batch: batch.id,
        },
      });
      hits.forEach(async (hit) => {
        await strapi.entityService.update("api::hit.hit", hit.id, {
          data: { status: "expired" },
        });
      });
      await strapi.entityService.update("api::batch.batch", batch.id, {
        data: { status: "expired" },
      });
    });
  },

  // myJob: {
  //   task: ({ strapi }) => {
  //     /* Add your own logic here */
  //     console.log("cron job is running");
  //   },
  //   options: {
  //     rule: "*/5 * * * * *",
  //     tz: "Asia/Ho_Chi_Minh",
  //   },
  // },
};
