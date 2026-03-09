export async function GET() {
  return Response.json({
    status: 'ok',
    message: 'KalaStudio API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
}
