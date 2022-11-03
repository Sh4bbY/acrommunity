import {BasePosition, FlyerPosition} from '@acrommunity/common';
import fs from 'fs';
import path from 'path';

export class Merger {
  constructor() {
  }

  loadPoses() {
    const directory = 'output/scrape/poses';
    const input = [
      {filename: 'christian-gieger-poses.json'},
      {filename: 'acrodicted-poses.json'},
      {filename: 'acropedia-poses.json'},
    ];

    return input.map(input => JSON.parse(fs.readFileSync(path.join(directory, input.filename), 'utf-8')));
  }

  run() {
    const [christianGiegerPoses, acrodictedPoses, acropediaPoses] = this.loadPoses();

    const poses = christianGiegerPoses.map(source => {
      const sourcePose = {
        name: this.mapPoseName(source.name),
        basePosition: source.name === 'Lovers Box' ? BasePosition.SITTING : BasePosition.LYING_ON_BACK,
        attachments: [source.image],
        aliases: source.aliases?.filter(alias => alias !== '-') || [],
        source: {
          christianGieger: source,
        },
      };
      if (sourcePose.name !== source.name) {
        sourcePose.aliases.push(source.name);
      }
      return sourcePose;
    });

    acrodictedPoses.forEach(source => this.processAcrodictedPose(poses, source));
    acropediaPoses.forEach(source => this.processAcropediaPose(poses, source));


    const results = poses.map((pose, idx) => ({...pose}));

    this.saveResults(results, 'poses.json');
  }

  processAcrodictedPose(poses, source) {
    let description = source.description.includes('info@acrodicted.com') ? undefined : source.description;
    if (description?.startsWith('<h2>Description</h2>')) {
      description = description.substr('<h2>Description</h2>'.length);
    }
    const sourcePose = {
      name: this.mapPoseName(source.name),
      attachments: [source.image],
      description: description,
      basePosition: this.mapBasePosition(source.basePosition),
      flyerPosition: this.mapFlyerPosition(source.flyerPosition),
      transitionsFrom: source.fromSource.filter(this.transitionFilter).map(this.mapPoseName),
      transitionsTo: source.toTarget.filter(this.transitionFilter).map(this.mapPoseName),
      source: {acrodicted: source},
      persons: source.persons,
      contactPoint: source.contactPoint,
      aliases: [],
    };

    if (source.name !== sourcePose.name) {
      sourcePose.aliases.push(source.name);
    }

    const pose = poses.find(pose => pose.name.toLowerCase() === sourcePose.name.toLowerCase());
    if (pose && pose.basePosition === sourcePose.basePosition) {
      pose.attachments = pose.attachments.concat(sourcePose.attachments);
      pose.aliases = pose.aliases.concat(sourcePose.aliases);
      pose.description = sourcePose.description;
      pose.basePosition = sourcePose.basePosition;
      pose.flyerPosition = sourcePose.flyerPosition;
      pose.transitionsFrom = sourcePose.transitionsFrom;
      pose.transitionsTo = sourcePose.transitionsTo;
      pose.contactPoint = sourcePose.contactPoint;
      pose.source.acrodicted = source;
    } else if (!pose) {
      poses.push(sourcePose);
    } else {
      poses.push({...sourcePose, name: sourcePose.name + ' ' + (sourcePose.basePosition)});
    }
  }

  processAcropediaPose(poses, source) {
    const sourcePose = {
      name: this.mapPoseName(source.name),
      attachments: [source.image.replace('-170x170', '')],
      description: source.text,
      persons: source.persons,
      source: {acropedia: source},
    };

    const pose = poses.find(pose => pose.name.toLowerCase() === sourcePose.name.toLowerCase());
    if (pose) {
      pose.attachments = pose.attachments.concat(sourcePose.attachments);
      pose.persons = pose.persons || source.persons;
      pose.difficulty = this.mapDifficulty(source.difficulty);
      pose.source.acropedia = source;
    } else {
      poses.push(sourcePose);
    }
  }

  mapPoseName(name) {
    if (name.endsWith('(L-Base)')) {
      name = name.substr(0, name.length - ' (L-Base)'.length);
    }

    switch (name) {
      case 'Front Bird':
      case 'Bird icarian':
        return 'Bird';
      case 'Reverse Front Plank':
        return 'Reverse Plank';
      case 'Reverse Sitting on Feet':
      case 'Reverse Sitting on Feet Icarian':
        return 'Throne';
      case 'Shoulderstand on Hands':
        return 'Shoulderstand';
      case 'Bow on Feet':
        return 'Bow';
      case 'Reverse Foot to Hand on Bent Arms':
      case '(low) Reverse Foot to Hand':
      case 'Reverse Standing in Hands on Bent Arms':
        return 'Reverse Foot to Hand (low)';
      case 'Reverse Standing in Hands':
        return 'Reverse Foot to Hand';
      case 'Outside Side Star':
      case 'Outside Star':
        return 'Outside Side-Star';
      case 'Inside Side Star':
      case 'Inside Star':
        return 'Inside Side-Star';
      case 'Reverse Outside Side Star':
      case 'Reverse Outside Star':
        return 'Reverse Outside Side-Star';
      case 'Reverse Inside Side Star':
      case 'Side Star':
        return 'Reverse Inside Side-Star';
      case 'Star stepping up':
      case 'Star with pop':
        return 'Star';
      case 'Handstand on Hands':
      case 'Handstand on Hands (L-Base) with half turn':
      case 'Handstand on Hands (L-Base) with tempo':
      case 'Hand-to-Hand':
        return 'Hand to Hand';
      case 'supported Shoulderstand':
      case 'Shoulderstand (L-Base, hands on ankles)':
        return 'Supported Shoulderstand';
      case 'Throne on Feet':
      case 'Throne on Feet (L-Base) to Plank on Feet (L-Base) Throne':
        return 'Straddle Throne';
      case 'Reverse Handstand on Hands':
        return 'Reverse Hand to Hand';
      case 'Floating Pashi':
        return 'Floating Paschi';
      case 'Reverse Supported Shoulderstand':
      case 'supported Reverse Shoulder Stand':
        return 'Supported Reverse Shoulderstand';
      case 'Foot to Hands on Bend Arms':
      case 'Standing in Hands on Bent Arms':
      case '(low) Foot to Hand':
      case 'Low Foot-to-Hand':
        return 'Foot to Hand (low)';
      case 'Vishnu’s Couch':
      case 'Vishnus Couch':
        return 'Vishnu\'s Couch';
      case 'Reverse Standing on Feet':
      case 'Foot-to-Foot':
        return 'Foot to Foot';
      case 'Maria on Feet':
        return 'Shin to Foot';
      case 'Reverse Shoulderstand on Hands':
      case 'Reverse Shoulder Stand':
        return 'Reverse Shoulderstand';
      case 'Croc on Feet':
        return 'Croc';
      case 'Biceps stand on Feet':
      case 'Bicep Stand':
        return 'Biceps Stand';
      case 'Handstand on Elbows':
        return 'Hand to Forearm';
      case 'Reverse Throne on Feet':
        return 'Reverse Throne';
      case 'L-Sit':
      case 'L- Sit':
        return 'L-Sit';
      case 'Plank on Feet':
        return 'Front Plank';
      case 'Back Plank on Feet':
        return 'Back Plank';
      case 'Reverse Front Bird':
        return 'Reverse Bird';
      case 'Back Bird on Hands':
        return 'Back Bird on Hands';
      case 'Standing in Hands':
      case 'Foot to Hand with half turn':
      case 'High Foot-to-Hand':
        return 'Foot to Hand';
      case 'Straddle Bat stepping down':
      case 'Straddle Bat with pop':
        return 'Straddle Bat';
      case 'Titibasana':
        return 'Tittibhasana';
      case 'Whale':
        return 'High Flying Whale';
      case 'Low hand-to-hand':
        return 'Hand to Hand (low)';
      case 'Standing on Feet':
        return 'Reverse Foot to Foot';
    }
    return name;
  }

  transitionFilter(input) {
    const excludes = ['END without Hands'];
    return !!input && !excludes.includes(input);
  }

  mapBasePosition(input: string) {
    switch (input) {
      case 'Base lying on the back':
        return BasePosition.LYING_ON_BACK;
      case 'Standing base':
        return BasePosition.STANDING;
      case 'Base lying on the belly':
        return BasePosition.LYING_ON_BELLY;
      case 'Sitting base':
        return BasePosition.SITTING;
      case 'empty string':
        return undefined;

      default:
        console.log(`BasePosition "${input}" unhandled`);
        return undefined;
    }
  }

  mapFlyerPosition(input: string) {
    switch (input) {
      case 'Flyer lying on the back':
        return FlyerPosition.LYING_ON_BACK;
      case 'Flyer on hands':
        return FlyerPosition.ON_HANDS;
      case 'Flyer on shoulders':
        return FlyerPosition.ON_SHOULDERS;
      case 'Standing flyer':
        return FlyerPosition.ON_HANDS;
      case 'Flyer on tights and headover':
        return FlyerPosition.ON_THIGHS_HEADOVER;
      case 'Flyer lying on the side':
        return FlyerPosition.LYING_ON_SIDE;
      case 'Flyer lying on the belly':
        return FlyerPosition.LYING_ON_BELLY;
      case 'Sitting flyer':
        return FlyerPosition.SITTING;
      case 'Kneeling flyer':
        return FlyerPosition.KNEELING;
      case 'Flyer on head':
        return FlyerPosition.ON_HEAD;
      case 'empty string':
        return undefined;

      default:
        console.log(`FlyerPosition "${input}" unhandled`);
        return undefined;
    }
  }

  mapDifficulty(input: string) {
    switch (input) {
      case 'Very Easy':
        return 1;
      case 'Easy':
        return 2;
      case 'Intermediate':
        return 3;
      case 'Hard':
        return 4;
      case 'Really Hard':
        return 5;
      case 'Expert':
        return 6;

      default:
        console.log(`Difficulty "${input}" unhandled`);
        return undefined;
    }
  }

  protected saveResults(results: any, fileName: string) {
    try {
      const data = JSON.stringify(results, null, 2);
      // const filePath = `output/merge/${fileName}`;
      const filePath = `../../api/db/data/poses/${fileName}`;
      fs.writeFileSync(filePath, data);
      console.log(`results written to ${filePath}`);
    } catch (e) {
      console.error(e);
    }
  }

}
