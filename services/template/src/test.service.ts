export interface testShape {
  data: string;
}

export async function testRoute(testMsg: string): Promise<testShape> {
  return Promise.resolve({ data: testMsg });
}
