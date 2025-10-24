import { readFile, writeFile } from 'fs/promises';

type messageObj = {
  content: string;
  id: number;
};

export class MessageRepository {
  async findOne(id: string | number): Promise<messageObj> {
    const content = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(content);

    return messages[id];
  }

  async findAll() {}

  async create(message: string) {}
}
