import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const sampleBios = [
  "Full-stack engineer who loves building social apps.",
  "Product manager with an eye for UX.",
  "Designer crafting delightful interfaces.",
  "DevOps enthusiast and infrastructure tinkerer.",
];

async function main() {
  // 1. Create Users
  await prisma.user.createMany({
    data: [
      {
        fullName: "Alice Johnson",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        title: "Freelance Carptener",
      },
      {
        fullName: "Bob Smith",
        avatarUrl: "https://i.pravatar.cc/150?img=2",
        title: "Freelance Plumber",
      },
      {
        fullName: "Charlie Brown",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
        title: "Freelance Designer",
      },
      {
        fullName: "Dana Lee",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
        title: "Freelance Painter",
      },
    ],
    skipDuplicates: true,
  });

  const allUsers = await prisma.user.findMany();

  // 2. Create Profiles for each user
  const sampleLocations = [
    "San Francisco, CA",
    "Toronto, ON",
    "London, UK",
    "Austin, TX",
  ];
  const sampleSkills = [
    ["JavaScript", "TypeScript", "Node.js"],
    ["Product", "Roadmaps"],
    ["Figma", "Illustration"],
    ["Kubernetes", "Terraform"],
  ];

  await Promise.all(
    allUsers.map((u, i) =>
      prisma.profile.create({
        data: {
          userId: u.id,
          bio: sampleBios[i % sampleBios.length],
          location: sampleLocations[i % sampleLocations.length],
          website: `https://example.com/${u.fullName.replace(/\s+/g, "-").toLowerCase()}`,
          coverUrl: `https://picsum.photos/seed/${encodeURIComponent(u.fullName)}/1200/300`,
          skills: sampleSkills[i % sampleSkills.length],
          data: {
            lookingFor: i % 2 === 0 ? "jobs" : "freelance",
            pronouns: i % 2 === 0 ? "she/her" : "they/them",
          },
        },
      })
    )
  );

  // 3. Create Posts
  await prisma.post.createMany({
    data: [
      {
        userId: allUsers[0].id,
        text: "Hello world!",
        content: "This is my first post!",
        media: [],
        likes: 5,
      },
      {
        userId: allUsers[1].id,
        text: "Good morning!",
        content: "Excited for today’s meeting.",
        media: [],
        likes: 3,
      },
      {
        userId: allUsers[2].id,
        text: "Design tip",
        content: "Use whitespace!",
        media: [],
        likes: 10,
      },
      {
        userId: allUsers[3].id,
        text: "Infra",
        content: "Kubernetes is powerful.",
        media: [],
        likes: 7,
      },
    ],
    skipDuplicates: true,
  });

  // 4. Create Connections
  await prisma.connection.createMany({
    data: [
      { userAId: allUsers[0].id, userBId: allUsers[1].id },
      { userAId: allUsers[0].id, userBId: allUsers[2].id },
      { userAId: allUsers[1].id, userBId: allUsers[2].id },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Database seeded successfully with User ↔ Profile relation!");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
