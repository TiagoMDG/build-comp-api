const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Seed data for the Competition model
  const competition = await prisma.competition.create({
    data: {
      title: "Competition 1",
      start: new Date("2024-08-01T00:00:00.000Z"),
      end: new Date("2024-09-01T00:00:00.000Z"),
      voteStart: new Date("2024-08-15T00:00:00.000Z"),
      voteEnd: new Date("2024-08-30T00:00:00.000Z"),
      maxVotes: 10,
      maxSubmissions: 5,
      done: false,
      deleted: false,
    },
  });

  // Seed data for the Entry model
  const entry = await prisma.entry.create({
    data: {
      competitionId: competition.id,
      title: "Entry 1",
      entryChannelId: "channel_1",
      forumPostId: "post_1",
      createdAt: new Date(),
      submittedAt: new Date(),
      submitted: true,
      invalidated: false,
    },
  });

  // Seed data for the Author model
  const author = await prisma.author.create({
    data: {
      entryId: entry.id,
      userId: "user_1",
    },
  });

  // Seed data for the Vote model
  const vote = await prisma.vote.create({
    data: {
      competitionId: competition.id,
      entryId: entry.id,
      userId: "user_2",
    },
  });

  // Seed data for the Settings model
  const setting = await prisma.settings.create({
    data: {
      setting: "site_name",
      value: "My Competition Site",
    },
  });

  console.log({ competition, entry, author, vote, setting });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
