import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { NodeSSH } from "node-ssh";
import dotenv from "dotenv";

dotenv.config();

const blp: string = "/sys/class/backlight/10-0045/bl_power";

async function getState(session: NodeSSH): Promise<string> {
  const { stderr, stdout } = await session.execCommand(`cat ${blp}`);
  if (stderr) return stderr;
  return stdout;
}

async function toggleScreen(session: NodeSSH, state: string): Promise<string> {
  const { stderr, stdout } = await session.execCommand(
    `echo ${state} | sudo tee ${blp}`
  );
  if (stderr) stderr;
  return stdout;
}

const app = new Hono();

app.get("/toggle", async (c) => {
  const ssh = new NodeSSH();

  const session = await ssh.connect({
    host: process.env.SSH_HOST,
    username: process.env.SSH_USERNAME,
    password: process.env.SSH_PASSWORD,
  });

  const state = await getState(session);

  const res = await toggleScreen(session, state === "0" ? "1" : "0");

  return c.text(res);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
