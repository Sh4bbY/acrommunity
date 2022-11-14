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

    const poses = [];
    const variations = [];

    christianGiegerPoses.forEach(source => this.processChristianGiegerPose(poses, source, variations));
    variations.forEach(source => this.processChristianGiegerVariation(poses, source));
    acrodictedPoses.forEach(source => this.processAcrodictedPose(poses, source));
    acropediaPoses.forEach(source => this.processAcropediaPose(poses, source));


    const results = poses.map((pose, idx) => ({...pose}));

    this.saveResults(results, 'poses.json');
  }

  processChristianGiegerPose(poses, source, variations) {
    const sourcePose = {
      name: this.mapPoseName(source.name),
      basePosition: source.name === 'Lovers Box' ? BasePosition.SITTING : BasePosition.LYING_ON_BACK,
      attachments: [source.image],
      persons: 2,
      aliases: source.aliases?.filter(alias => alias !== '-') || [],
    };
    if (sourcePose.name !== source.name) {
      sourcePose.aliases.push(source.name);
    }

    poses.push(sourcePose);
    source.variations?.forEach(variation => variations.push(variation));
  }

  processChristianGiegerVariation(poses, variation) {
    const sourcePose = {
      name: this.mapPoseName(variation.name),
      basePosition: variation.name === 'Lovers Box' ? BasePosition.SITTING : BasePosition.LYING_ON_BACK,
      attachments: [variation.img],
      persons: 2,
      aliases: [],
    };

    const excludes = ['Star, Flyer m. gestreckten Armen', 'supported Reverse Shoulderstand (Stagged Leg)'];
    const pose = poses.find(pose => pose.name.toLowerCase() === sourcePose.name.toLowerCase());
    if (!pose && !excludes.includes(variation.name)) {
      poses.push(sourcePose);
    }
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
      sourcePoses: source.fromSource.filter(this.transitionFilter).map(this.mapPoseName),
      targetPoses: source.toTarget.filter(this.transitionFilter).map(this.mapPoseName),
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
      pose.sourcePoses = sourcePose.sourcePoses;
      pose.targetPoses = sourcePose.targetPoses;
      pose.contactPoint = sourcePose.contactPoint;
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
    };

    const pose = poses.find(pose => pose.name.toLowerCase() === sourcePose.name.toLowerCase());
    if (pose) {
      pose.attachments = pose.attachments.concat(sourcePose.attachments);
      pose.persons = pose.persons || source.persons;
      pose.difficulty = this.mapDifficulty(source.difficulty);
    } else {
      poses.push(sourcePose);
    }
  }

  mapPoseName(name) {
    if (name.endsWith('(L-Base)')) {
      name = name.substr(0, name.length - ' (L-Base)'.length);
    }

    switch (name) {
      case 'Reverse Foot to Hand standing':
        return 'Candle Stick';
      case 'Shoulderstand (L-Base, supported on the knees)':
        return 'Candle Stick';
      case 'Sitting on Feet':
        return 'Reverse Throne';
      case 'Foot to Hand (gestreckte Arme)':
        return 'Foot to Hand';
      case 'sup. Rev. Shoulder Stand stagged leg':
        return 'supported Reverse Shoulderstand (Stagged Leg)';
      case 'Lovers Box ohne support':
        return 'Lovers Box';
      case 'Asym':
        return 'Flamingo';
      case 'Ninja Pose':
        return 'Ninja';
      case 'Pidgeon Pose':
        return 'Pidgeon';
      case 'Front Bird on Hands':
        return 'Bird on Hands';
      case 'seated Bird on Hands':
        return 'Bird on Hands (Sitting Base)';
      case 'Reverse Couch':
        return 'Reverse Vishnu\'s Couch';
      case 'Sideway Back Plank':
        return 'Sideway Back Bird';
      case 'Hand - Box':
        return 'Foot to Hand - Box';
      case 'Shoulderstand on Feet':
      case 'Star to Standing in Hands (L-Base) Pike over':
        return 'Star';
      case 'Reverse Plank (Standing Base) sequenza 1':
      case 'Reverse Plank (Standing Base)':
        return 'Reverse Bird (Standing Base)';
      case 'Entry to Back Plank on Feet (L-Base) Handstand Entry':
        return 'Start';
      case 'Front Bird':
      case 'Bird icarian':
      case 'Bird with Hands':
      case 'Plank on Feet (L-Base) Throne to Bird Pop':
        return 'Bird';
      case 'Back Plank on Feet (L-Base) Handstand Entry to Back Bird':
        return 'Back Bird';
      case 'Reverse Front Plank':
        return 'Reverse Plank';
      case 'Reverse Sitting on Feet':
      case 'Reverse Sitting on Feet Icarian':
        return 'Throne';
      case 'Reverse Shoulderstand on Feet':
        return 'Reverse Star';
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
      case 'Foot to Hand Chinese Roll':
      case 'Foot to Hands on Bend Arms (Free)':
      case 'Standing in Hands on Bent Arms':
      case '(low) Foot to Hand':
      case 'Low Foot-to-Hand':
      case 'Foot to Hands':
      case 'Foot to Hands on Bend Arms to Back Plank on Feet (L-Base) - Flyer bending':
      case 'Foot to Hands on Bend Arms to Back Plank on Feet (L-Base) - Flyer rotating':
        return 'Foot to Hand (low)';
      case 'Vishnu’s Couch':
      case 'Vishnus Couch':
        return 'Vishnu\'s Couch';
      case 'Reverse Standing on Feet':
      case 'Reverse Standing on Feet (L-Base) Icarian':
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
      case 'Reverse Throne':
      case 'Reverse Throne on Feet':
      case 'Reverse Sitting on Feet icarian':
        return 'Reverse Straddle Throne';
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
      case 'Foot to Hand stepping down':
      case 'High Foot-to-Hand':
        return 'Foot to Hand';
      case 'Straddle Bat stepping down':
      case 'Straddle Bat with pop':
      case 'Straddle Bat cartwheel':
        return 'Straddle Bat';
      case 'Titibasana':
        return 'Tittibhasana';
      case 'Whale':
        return 'High Flying Whale';
      case 'Low hand-to-hand':
        return 'Hand to Hand (low)';
      case 'Standing on Feet':
      case 'Standing on Feet (L-Base) stepping up':
        return 'Reverse Foot to Foot';
      case 'Free Shoulder Stand':
        return 'Shoulderstand';
      case 'Sitting on Shoulders (Standing Base) with jump':
        return 'Sitting on Shoulders';
      case 'Standing on Thighs half turn':
        return 'Standing on Thighs';
      case 'Sitting on Feet (L-Base) Icarian Pop':
        return 'Sitting on Feet (L-Base)';
      case 'Foot to hand (Sitting Base) with a pop':
        return 'Foot to hand (Sitting Base)';
      case 'Standing in Hands on Extended Arms (Standing Base)':
      case 'Foot to hand (Standing Base) with a pop':
      case 'Foot to hand (Standing Base) - courbette':
        return 'Foot to Hand (Standing Base)';
      case 'Plank (Standing Base)':
        return 'High Bird';
      case 'Butterfly':
        return 'High Sidestar';
      case 'Plank on Hands':
        return 'Bird on Hands';
      case 'Back Plank on Hands':
        return 'Back Bird on Hands';
      case 'Reverse Plank on Hands':
        return 'Reverse Bird on Hands';
      case 'Reverse Back Plank on Feet':
        return 'Reverse Back Bird';
      case 'Reverse Back Plank on Hands':
        return 'Reverse Back Bird on Hands';
      case 'Reverse Bird on Hands on Lying Base':
        return 'Reverse Bird on Hands';
      case 'Back Plank (Standing Base)':
        return 'High Back Bird';
      case 'Sitting on Shoulders (Standing Base) stepping down':
        return 'Sitting on Shoulders (Standing Base)';
      case 'Standing in Hands (Belly Base) Chinese Roll':
      case 'Standing in Hands (Belly Base)':
        return 'Foot to Hand (Belly Base)';
      case 'Reverse Handstand on Feet (L-Base) Catapult':
      case 'Reverse Handstand on Feet (L-Base)':
        return 'Reverse Handstand on Feet';
      case 'Reverse Standing on Thighs half turn':
      case 'Reverse Standing on Thighs':
        return 'Reverse Thigh Stand';
      case 'Two-Man-High with tempo':
        return 'Two-Man-High';
      case 'Standing on Shoulders (Zombie) with a pop':
        return 'Standing on Shoulders (Zombie)';
      case 'Handstand on Hands (Standing Base)':
      case 'Handstand on Hands (Standing Base) - cascade':
        return 'Hand on Hand (Standing Base)';
      case 'Standing on Head (Standing Base) sitting down':
        return 'Standing on Head (Standing Base)';
      case 'Standing on Head (Sitting Base) standing up':
        return 'Standing on Head (Sitting Base)';
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
      const filePath = `output/merge/${fileName}`;
      fs.writeFileSync(filePath, data);
      console.log(`results written to ${filePath}`);
    } catch (e) {
      console.error(e);
    }
  }

}
