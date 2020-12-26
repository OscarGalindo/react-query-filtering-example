import {userRepository} from "../infrastructure/userRepository";

export default function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    cities: userRepository.findUsers().map(user => user.city)
  }));
}