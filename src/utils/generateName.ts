import { nameParts } from "../data/names";

export function generatePlayerName(): string {
    const color = nameParts.colors[Math.floor(Math.random() * nameParts.colors.length)];
    const animal = nameParts.animals[Math.floor(Math.random() * nameParts.animals.length)];
    return `${color} ${animal}`;
}