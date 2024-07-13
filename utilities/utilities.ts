import { faker } from "@faker-js/faker";

export class Utilities {
    static async getRandomNumber(min: number, max: number): Promise<number> {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static async getUniqueRandomNumbers(min: number, max: number, n: number): Promise<number[]> {
        const numbers = new Set<number>();

        while (numbers.size < n) {
            const randomNumber = await this.getRandomNumber(min, max);
            numbers.add(randomNumber);
        }

        return Array.from(numbers);
    }

    static async generateRandomUsername(first_name: string, last_name: string): Promise<string> {
        let username: string;
        const nameRegex = /^[a-zA-Z0-9_]+$/;

        do {
            username = faker.internet.userName({ firstName: first_name, lastName: last_name })
        } while (!nameRegex.test(username));

        return username;
    }
}