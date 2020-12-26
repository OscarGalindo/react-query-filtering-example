import {userRepository} from "../../infrastructure/userRepository";

export default function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const {
    query: { userId },
  } = req
  userRepository.block(userId);
  res.end(JSON.stringify({success: true}));
}