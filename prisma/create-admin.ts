import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import readline from "readline";

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log("\n=== RRC Saudi — Admin User Creation ===\n");

  const existingAdmins = await prisma.user.count({
    where: { role: "SUPER_ADMIN" },
  });

  if (existingAdmins > 0) {
    console.log(`⚠️  ${existingAdmins} SUPER_ADMIN(s) already exist.`);
    const proceed = await ask("Create another admin? (yes/no): ");
    if (proceed.toLowerCase() !== "yes") {
      console.log("Aborted.");
      process.exit(0);
    }
  }

  const email = await ask("Email: ");
  if (!email.includes("@") || !email.includes(".")) {
    console.error("❌ Invalid email address.");
    process.exit(1);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.error("❌ A user with this email already exists.");
    process.exit(1);
  }

  const name = await ask("Name (optional): ") || null;

  const password = await ask("Password (min 8 chars): ");
  if (password.length < 8) {
    console.error("❌ Password must be at least 8 characters.");
    process.exit(1);
  }

  const confirm = await ask("Confirm password: ");
  if (password !== confirm) {
    console.error("❌ Passwords do not match.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  console.log(`\n✅ SUPER_ADMIN created successfully:`);
  console.log(`   ID:    ${user.id}`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Name:  ${user.name || "(not set)"}`);
  console.log(`   Role:  ${user.role}`);
  console.log(`\nYou can now log in at /admin/login\n`);
}

main()
  .catch((e) => {
    console.error("❌ Failed:", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    rl.close();
  });
