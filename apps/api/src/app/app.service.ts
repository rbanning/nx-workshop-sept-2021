import { Injectable } from '@nestjs/common';
import { IGame } from '@bg-hoard/util-interface';

@Injectable()
export class AppService {
  private games: IGame[] = [
    {
      id: 'settlers-in-the-can',
      name: 'Settlers in the Can',
      image: '/assets/beans.png', // 'https://media.giphy.com/media/xUNda3pLJEsg4Nedji/giphy.gif',
      description:
        'Help your bug family claim the best real estate in a spilled can of beans.',
      price: 35,
      rating: Math.random(),
    },
    {
      id: 'chess-pie',
      name: 'Chess Pie',
      image: '/assets/chess.png', // 'https://media.giphy.com/media/iCZyBnPBLr0dy/giphy.gif',
      description: 'A circular game of Chess that you can eat as you play.',
      price: 15,
      rating: Math.random(),
    },
    {
      id: 'purrfection',
      name: 'Purrfection',
      image: '/assets/cat.png', // 'https://media.giphy.com/media/12xMvwvQXJNx0k/giphy.gif',
      description: 'A cat grooming contest goes horribly wrong.',
      price: 45,
      rating: Math.random(),
    },
  ];

  getAllGames = () => [...this.games];
  getGame = (id: string) => this.getAllGames().find((game) => game.id === id);
}
