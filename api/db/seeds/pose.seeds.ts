import {faker} from '@faker-js/faker';
import {poseTable} from '../tables';
import {Seeds} from './Seeds';

export const poseSeeds = new Seeds(poseTable.name);
let id = 1;

export const POSE = {
  FRONT_PLANK: {
    id: id++, name: 'Front Plank', attachments: [
      {url: 'https://www.fitforfun.de/files/images/201909/1/flugstunde-mit-acroyoga,383383_m_n.jpg', name: 'Flugstunde mit Acroyoga'},
      {url: 'https://static.wixstatic.com/media/775065_af81861b715644b392050f380063f038~mv2.jpg/v1/fill/w_925,h_694,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/775065_af81861b715644b392050f380063f038~mv2.jpg'},
    ],
  },
  EXTENDED_FRONT_PLANK: {id: id++, name: 'Extended Front Plank', attachments: []},
  PIGEON: {id: id++, name: 'Pigeon', attachments: ['https://i.pinimg.com/564x/d0/f6/f4/d0f6f443c7fab0f5dbadd1139aa1c61b.jpg']},
  BIRD: {id: id++, name: 'Bird', attachments: ['https://www.madymorrison.com/wp-content/uploads/2016/11/acroyoga_partneryoga_frontbird_yogacouple_6-1014x487.png']},
  BACK_BIRD: {id: id++, name: 'Back Bird', attachments: ['https://www.christiangieger.de/wp-content/uploads/2021/06/Acroyoga-Haltung-Pose042.webp']},
  FOLDED_LEAF: {id: id++, name: 'Folded Leaf', attachments: ['https://www.christiangieger.de/wp-content/uploads/2021/06/Acroyoga-Haltung-Pose055.jpg']},
  STRADDLE_THRONE: {id: id++, name: 'Straddle Throne', attachments: ['https://www.christiangieger.de/wp-content/uploads/2021/06/Acroyoga-Haltung-Pose020.jpg']},
  THINKER: {id: id++, name: 'Thinker', attachments: ['https://i.pinimg.com/564x/3b/c5/26/3bc5262486a2da9b7544b650f3d4a443--the-thinker-yoga-poses.jpg']},
  THRONE: {id: id++, name: 'Throne', attachments: ['https://www.fitforfun.de/files/images/201909/2/acroyoga-throne,383384_nlf_n.jpg']},
  REVERSE_THRONE: {id: id++, name: 'Reverse Throne', attachments: ['https://www.christiangieger.de/wp-content/uploads/2021/06/Acroyoga-Haltung-Pose020.jpg']},
  WHALE: {
    id: id++,
    name: 'High Flying Whale',
    attachments: ['https://media.istockphoto.com/photos/acroyoga-high-flying-whale-picture-id485160416?k=20&m=485160416&s=170667a&w=0&h=r5BRqfxqUYVFckB957K9zolDb2m4aZC5lQARJALBhW0='],
  },
  STAR: {
    id: id++,
    name: 'Star',
    attachments: ['https://us.123rf.com/450wm/anoushkatoronto/anoushkatoronto1708/anoushkatoronto170800208/84921767-jogi-mit-zwei-junger-sch%C3%B6ner-kaukasischer-frauen-der-sternacro-yoga-haltung-tut-frauen-die-drau%C3%9Fen-t.jpg?ver=6'],
  },
  SIDE_STAR: {id: id++, name: 'Side Star', attachments: ['https://www.christiangieger.de/wp-content/uploads/2021/06/Acroyoga-Haltung-Pose088.jpg']},
  STRADDLEBAT: {id: id++, name: 'Straddlebat', attachments: ['https://www.christiangieger.de/wp-content/uploads/2021/06/Acroyoga-Haltung-Pose082.jpg']},
  FOOT_TO_SHIN: {id: id++, name: 'Foot to Shin', attachments: ['https://feeltheflowhh.de/wp-content/uploads/2021/04/02_02_Foot-to-Shin_4_LR_Export-1030x579.jpg']},
  SHIN_TO_FOOT: {id: id++, name: 'Shin to Foot', attachments: ['https://www.christiangieger.de/wp-content/uploads/2021/06/Acroyoga-Haltung-Pose035.jpg']},
  FOOT_TO_HANDS: {id: id++, name: 'Foot to Hands', attachments: ['https://www.christiangieger.de/wp-content/uploads/2021/06/Acroyoga-Haltung-Pose016.jpg']},
  REVERSE_BIRD: {id: id++, name: 'Reverse Bird', attachments: ['https://www.christiangieger.de/wp-content/uploads/2021/06/Acroyoga-Haltung-Pose006.jpg']},
  SHOULDERSTAND: {id: id++, name: 'Shoulderstand', attachments: ['https://acroyoga402.files.wordpress.com/2016/06/4-shoulder-stand.jpg?w=372&h=347']},
  NEEDLE: {id: id++, name: 'Needle', attachments: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRByvElOSz2sElM-XgfHgKb4lBtkjj8ZvK7cA&usqp=CAU']},
  BOW: {id: id++, name: 'Bow', attachments: ['https://i.pinimg.com/564x/44/5c/91/445c91a0c45c8eca74856524ef4addd1--yoga-photos-partner-yoga.jpg']},
  VISHNUS_COUCH: {id: id++, name: 'Vishnu’s Couch', attachments: ['https://www.christiangieger.de/wp-content/uploads/2021/06/Acroyoga-Haltung-Pose084.jpg']},
  HANDBIRD: {id: id++, name: 'Handbird', attachments: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuTTlLPCZsPlh4IXWoENiYna_0or66mjLXmQ&usqp=CAU']},
  HIGHBIRD: {id: id++, name: 'Highbird', attachments: ['https://i.ytimg.com/vi/M9sudvsHBp4/maxresdefault.jpg']},
  FLOATING_PASCHI: {
    id: id++,
    name: 'Floating Paschi',
    attachments: ['https://www.christiangieger.de/wp-content/uploads/2021/07/Acroyoga-Floating-Paschi-Dreiceck-Pose-scaled.jpg'],
  },
};

// see for more poses:
// https://acroyoga757.com/acro-yoga-poses/
// https://www.christiangieger.de/acroyoga-poses/

poseSeeds.setData(async () => {
  return Object.values(POSE).map(pose => ({
    id: pose.id,
    name: pose.name,
    description: faker.lorem.text(),
  }));
});

poseSeeds.setMeta('attachments', Object.values(POSE).reduce((arr, pose: any) =>
    pose.attachments
      ? arr.concat(pose.attachments.map(attachment => {
        if (typeof attachment === 'string') {
          return {url: attachment, attachableId: pose.id};
        } else {
          return {...attachment, attachableId: pose.id};
        }
      }))
      : arr,
  []));
