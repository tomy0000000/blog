import type { VercelRequest, VercelResponse } from "@vercel/node"

export default function handler(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
  })
}
