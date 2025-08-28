import request from "supertest";
import jest from "jest";
import app from "../src/server";

// Mock the auth service functions
jest.mock("../src/auth.service", () => ({
  signUp: jest.fn().mockResolvedValue({ id: "123", email: "test@example.com" }),
  signIn: jest.fn().mockResolvedValue({ token: "mock-token" }),
  getSessions: jest.fn().mockResolvedValue({ session: "active" }),
  signOut: jest.fn().mockResolvedValue({ success: true }),
  resetPassword: jest.fn().mockResolvedValue({ success: true }),
  getUser: jest
    .fn()
    .mockResolvedValue({ id: "123", email: "test@example.com" }),
}));

describe("Auth Service (mocked)", () => {
  const testEmail = "test@example.com";
  const testPassword = "mypassword";
  const testUsername = "testuser";

  it("GET / should return health message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Auth service is running");
  });

  it("POST /auth/sign-up/email should create user", async () => {
    const res = await request(app).post("/auth/sign-up/email").send({
      email: testEmail,
      password: testPassword,
      username: testUsername,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe(testEmail);
  });

  it("POST /auth/sign-in should log user in", async () => {
    const res = await request(app)
      .post("/auth/sign-in")
      .send({ email: testEmail, password: testPassword });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.token).toBe("mock-token");
  });

  it("GET /auth/get-session should return session info", async () => {
    const res = await request(app).get("/auth/get-session");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ session: "active" });
  });

  it("POST /auth/sign-out should succeed", async () => {
    const res = await request(app)
      .post("/auth/sign-out")
      .send({ email: testEmail });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true });
  });

  it("POST /auth/reset-password should succeed", async () => {
    const res = await request(app)
      .post("/auth/reset-password")
      .send({ email: testEmail, newPassword: "newpassword" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true });
  });
});
