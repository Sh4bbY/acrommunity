import {faker} from '@faker-js/faker';
import {AttachmentType} from '~/enums';
import {flowsTable} from '../tables/flows.table';
import {Seeds} from './Seeds';

export const flowSeeds = new Seeds(flowsTable.name);

let id = 1;
const acronycWashingMachines = [
  {id: id++, difficulty: 1, name: 'Awkward Look', attachments: []},
  {id: id++, difficulty: 1, name: 'Ballerina', attachments: [{url: 'https://www.youtube-nocookie.com/embed/p1oeyEVgRfM', type: AttachmentType.YouTube}]},
  {id: id++, difficulty: 1, name: 'Barrel Roll', attachments: [{url: 'https://www.youtube-nocookie.com/embed/ty7J2yF4h8w', type: AttachmentType.YouTube}]},
  {id: id++, difficulty: 1, name: 'Biglemoi', attachments: [{url: 'https://www.youtube-nocookie.com/embed/ZiyigfjF-Z8', type: AttachmentType.YouTube}]},
  {id: id++, difficulty: 1, name: 'Binding Edge', attachments: [{url: 'https://www.youtube-nocookie.com/embed/QOu1tlBXdsM', type: AttachmentType.YouTube}]},
  {id: id++, difficulty: 1, name: 'Boom Bareback', attachments: []},
  {id: id++, difficulty: 1, name: 'Boomerang', attachments: []},
  {id: id++, difficulty: 1, name: 'Buddha Rising', attachments: []},
  {id: id++, difficulty: 1, name: 'Cannonball Run', attachments: []},
  {id: id++, difficulty: 1, name: 'Cassiopeia', attachments: []},
  {id: id++, difficulty: 1, name: 'Catch a Bird', attachments: []},
  {id: id++, difficulty: 1, name: 'Cathrines Wheel', attachments: []},
  {id: id++, difficulty: 1, name: 'Chameleon', attachments: []},
  {id: id++, difficulty: 1, name: 'Chinese Dragon', attachments: []},
  {id: id++, difficulty: 1, name: 'Circuit Runner', attachments: []},
  {id: id++, difficulty: 1, name: 'Corkscrew', attachments: []},
  {id: id++, difficulty: 1, name: 'Creeper', attachments: []},
  {id: id++, difficulty: 1, name: 'Croc', attachments: []},
  {id: id++, difficulty: 1, name: 'Crochet', attachments: []},
  {id: id++, difficulty: 1, name: 'Crotch Paper Scissors', attachments: []},
  {id: id++, difficulty: 1, name: 'Cuttlefish', attachments: []},
  {id: id++, difficulty: 1, name: 'Dandelion', attachments: []},
  {id: id++, difficulty: 1, name: 'Dragonfly', attachments: []},
  {id: id++, difficulty: 1, name: 'Dreamwalk', attachments: []},
  {id: id++, difficulty: 1, name: 'Espresso Shot', attachments: []},
  {id: id++, difficulty: 1, name: 'Eternity', attachments: []},
  {id: id++, difficulty: 1, name: 'Extra Mile', attachments: []},
  {id: id++, difficulty: 1, name: 'Ferris Wheel', attachments: []},
  {id: id++, difficulty: 1, name: 'Final Nexus', attachments: []},
  {id: id++, difficulty: 1, name: 'Fireball', attachments: []},
  {id: id++, difficulty: 1, name: 'Flatspin', attachments: []},
  {id: id++, difficulty: 1, name: 'Flight to Uranus', attachments: []},
  {id: id++, difficulty: 1, name: 'Flipper', attachments: []},
  {id: id++, difficulty: 1, name: 'Flying Crescent', attachments: []},
  {
    id: id++, difficulty: 1, name: 'Four Step', attachments: [
      {url: 'https://www.youtube-nocookie.com/embed/MOydBLLUZmw', type: AttachmentType.YouTube},
    ],
  },
  {id: id++, difficulty: 1, name: 'Graeme Cracker', attachments: []},
  {id: id++, difficulty: 1, name: 'Hamster Wheel', attachments: []},
  {id: id++, difficulty: 1, name: 'Headspin', attachments: []},
  {id: id++, difficulty: 1, name: 'Hedgehog', attachments: []},
  {id: id++, difficulty: 1, name: 'Hippie', attachments: []},
  {id: id++, difficulty: 1, name: 'Hold the Throne', attachments: []},
  {id: id++, difficulty: 1, name: 'Humphrey', attachments: []},
  {id: id++, difficulty: 1, name: 'Icing on the Cake', attachments: []},
  {id: id++, difficulty: 1, name: 'Iguana', attachments: []},
  {id: id++, difficulty: 1, name: 'Illusion', attachments: []},
  {id: id++, difficulty: 1, name: 'Kings Pendulum', attachments: []},
  {id: id++, difficulty: 1, name: 'Kitty Foot', attachments: []},
  {id: id++, difficulty: 1, name: 'Koala Walla', attachments: []},
  {id: id++, difficulty: 1, name: 'L.A. Gear', attachments: []},
  {id: id++, difficulty: 1, name: 'Lazy Lightening', attachments: []},
  {id: id++, difficulty: 1, name: 'Lizard', attachments: []},
  {id: id++, difficulty: 1, name: 'London Spin', attachments: []},
  {id: id++, difficulty: 1, name: 'Love Bug', attachments: []},
  {id: id++, difficulty: 1, name: 'Magical Things', attachments: []},
  {id: id++, difficulty: 1, name: 'Meremaid', attachments: []},
  {id: id++, difficulty: 1, name: 'Meteor', attachments: []},
  {id: id++, difficulty: 1, name: 'Mind Twister', attachments: []},
  {id: id++, difficulty: 1, name: 'Monkey Frog', attachments: []},
  {id: id++, difficulty: 1, name: 'Moonies', attachments: []},
  {id: id++, difficulty: 1, name: 'Music Box', attachments: []},
  {id: id++, difficulty: 1, name: 'Musical Chairs', attachments: []},
  {id: id++, difficulty: 1, name: 'Naked Singularity', attachments: []},
  {id: id++, difficulty: 1, name: 'Nataraj', attachments: []},
  {id: id++, difficulty: 1, name: 'Neutron Star', attachments: []},
  {id: id++, difficulty: 1, name: 'Ninjacopter', attachments: []},
  {
    id: id++, difficulty: 1, name: 'Ninja Star', attachments: [
      {url: 'https://www.youtube-nocookie.com/embed/vmD-rR8z_MA', name: 'Ninja Star Video', type: AttachmentType.YouTube},
    ],
  },
  {id: id++, difficulty: 1, name: 'Nunchuk', attachments: []},
  {id: id++, difficulty: 1, name: 'One Happy Thought', attachments: []},
  {id: id++, difficulty: 1, name: 'Open Foot', attachments: []},
  {id: id++, difficulty: 1, name: 'Perfect Storm', attachments: []},
  {id: id++, difficulty: 1, name: 'Pickpocket', attachments: []},
  {id: id++, difficulty: 1, name: 'Pop n\' Roll', attachments: []},
  {id: id++, difficulty: 1, name: 'Polly Rolly', attachments: []},
  {id: id++, difficulty: 1, name: 'Prasarita Twist', attachments: []},
  {id: id++, difficulty: 1, name: 'Revolution', attachments: []},
  {id: id++, difficulty: 1, name: 'Rocking the Throne', attachments: []},
  {id: id++, difficulty: 1, name: 'Rollercoaster', attachments: []},
  {id: id++, difficulty: 1, name: 'Rottiserie', attachments: []},
  {id: id++, difficulty: 1, name: 'Rubiks Cube', attachments: []},
  {id: id++, difficulty: 1, name: 'Secretary', attachments: []},
  {id: id++, difficulty: 1, name: 'Shadow Roll', attachments: []},
  {id: id++, difficulty: 1, name: 'Skipping Stone', attachments: []},
  {id: id++, difficulty: 1, name: 'Snyder', attachments: []},
  {id: id++, difficulty: 1, name: 'Spider Roll', attachments: []},
  {id: id++, difficulty: 1, name: 'Spin-Tronics', attachments: []},
  {id: id++, difficulty: 1, name: 'Spiral', attachments: []},
  {id: id++, difficulty: 1, name: 'Squirrel Roll', attachments: []},
  {id: id++, difficulty: 1, name: 'Star Wars', attachments: []},
  {id: id++, difficulty: 1, name: 'Supernova', attachments: []},
  {id: id++, difficulty: 1, name: 'Swiss Watch', attachments: []},
  {id: id++, difficulty: 1, name: 'Synchronicity', attachments: []},
  {id: id++, difficulty: 1, name: 'Tea Cup Ride', attachments: []},
  {id: id++, difficulty: 1, name: 'Tiramisu', attachments: []},
  {id: id++, difficulty: 1, name: 'Trap Door', attachments: []},
  {id: id++, difficulty: 1, name: 'Trinity', attachments: []},
  {id: id++, difficulty: 1, name: 'Tumbler', attachments: []},
  {id: id++, difficulty: 1, name: 'Tumbleweed', attachments: []},
  {id: id++, difficulty: 1, name: 'Twist & Shout', attachments: []},
  {id: id++, difficulty: 1, name: 'Twisted Star Child', attachments: []},
  {id: id++, difficulty: 1, name: 'Via Ferrata', attachments: []},
  {id: id++, difficulty: 1, name: 'Voltage', attachments: []},
  {id: id++, difficulty: 1, name: 'Vortex', attachments: []},
  {id: id++, difficulty: 1, name: 'Waggle Baggle', attachments: []},
  {id: id++, difficulty: 1, name: 'Waggle Wiggle', attachments: []},
  {id: id++, difficulty: 1, name: 'Weather Vane', attachments: []},
  {id: id++, difficulty: 1, name: 'Weightlessness', attachments: []},
  {id: id++, difficulty: 1, name: 'Whirly Bird', attachments: []},
  {id: id++, difficulty: 1, name: 'Whirly Gig', attachments: []},
];

flowSeeds.setData(async () => {
  return acronycWashingMachines.map((washingMachine) => ({
    id: washingMachine.id,
    name: washingMachine.name,
    difficulty: washingMachine.difficulty,
    description: faker.lorem.text(),
  }));
});


flowSeeds.setMeta('attachments', acronycWashingMachines.reduce((arr, flow: any) =>
    flow.attachments
      ? arr.concat(flow.attachments.map(attachment => ({...attachment, attachableId: flow.id, name: flow.name + ' Video'})))
      : arr,
  []));
