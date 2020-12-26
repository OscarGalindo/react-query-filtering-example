import {userRepository} from "../infrastructure/userRepository";

export default function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  const filters = {
    city: req.query.city,
    status: req.query.status || req.query["status[]"]
  }

  const users = userRepository.findUsers(filters);

  res.end(JSON.stringify(users));
}