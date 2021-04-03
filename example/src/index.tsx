import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import DraggableList from 'advanced-react-native-sortable-list';

interface DataItem {
  name: string;
  info: string;
  uri: string;
}

const data: Array<DataItem> = [
  {
    name: 'Malabar giant squirrel',
    info:
      'This species is endemic to India, with main sections of its distribution in the Western Ghats, Eastern Ghats and Satpura Range as far north as Madhya Pradesh (approximately 22° N).[1][3] It is found at altitudes of 180–2,300 m (590–7,550 ft) in tropical deciduous, semi-deciduous (where often utilizing denser riparian growth), and moist evergreen forests and woodlands.',
    uri:
      'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/04/02/15/multicoloured-squirrel.jpg?width=1200',
  },
  {
    name: 'Lion tailed macaque',
    info:
      'The hair of the lion-tailed macaque is black. Its outstanding characteristic is the silver-white mane which surrounds the head from the cheeks down to its chin, which gives this monkey its German name Bartaffe – "beard ape". The hairless face is black in colour. With a head-body length of 42 to 61 cm and a weight of 2 to 10 kg, it ranks among the smaller macaques.',
    uri:
      'https://res.cloudinary.com/roundglass/image/upload/c_fill,ar_1.1,g_auto/f_auto/v1558523945/roundglass/sustain/Mother-and-child_imocmh.jpg',
  },
  {
    name: 'Gaur',
    info:
      'The gaur (Bos gaurus; /ɡaʊər/), also known as the Indian bison, is a bovine native to South and Southeast Asia, and has been listed as Vulnerable on the IUCN Red List since 1986. The global population was estimated at a maximum of 21,000 mature individuals in 2016.',
    uri:
      'https://static.wikia.nocookie.net/creatures-of-the-world/images/d/dc/1059188-gaur-wallpapers-1000x800.jpg/revision/latest/scale-to-width-down/340?cb=20161021184213',
  },
  {
    name: 'Great Indian Hornbill',
    info:
      'The great hornbill (Buceros bicornis) also known as the concave-casqued hornbill, great Indian hornbill or great pied hornbill, is one of the larger members of the hornbill family. It is found in the Indian subcontinent and Southeast Asia. Its impressive size and colour have made it important in many tribal cultures and rituals.',
    uri:
      'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/146172721/1800',
  },
  {
    name: 'Crested Hawk Eagle',
    info:
      'The changeable hawk-eagle or crested hawk-eagle (Nisaetus cirrhatus) is a large bird of prey species of the family Accipitridae. More informal or antiquated English common names include the marsh hawk-eagle or Indian crested hawk-eagle.',
    uri:
      'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/145284411/1800',
  },
  {
    name: 'King Cobra',
    info:
      "The king cobra (Ophiophagus hannah) is a large elapid endemic to forests from India through Southeast Asia. It is the world's longest venomous snake.[2] Adult king cobras are 3.18 to 4 m (10.4 to 13.1 ft) long on average. The longest known individual measured 5.85 m (19.2 ft).",
    uri:
      'https://upload.wikimedia.org/wikipedia/commons/4/4d/12_-_The_Mystical_King_Cobra_and_Coffee_Forests.jpg',
  },
  {
    name: 'Indian spotted chevrotain',
    info:
      'The Indian spotted chevrotain (Moschiola indica) is a species of even-toed ungulate in the family Tragulidae. It is native to India and possibly Nepal. It lives in rainforests and is nocturnal.[1] It has a body length of 57.5 cm (22.6 in) with a 2.5 cm (0.98 in) long tail length and weighs around 3 kg (6.6 lb)',
    uri:
      'https://upload.wikimedia.org/wikipedia/commons/1/1c/Indian_Spotted_Chevrotain_%28Moschiola_indica%29.JPG',
  },
  {
    name: 'Indian Muntjac',
    info:
      'This muntjac has soft, short, brownish or greyish hair, sometimes with creamy markings. It is among the smallest deer species. It is an omnivore and eats grass, fruit, shoots, seeds, bird eggs, and small animals, and occasionally scavenges on carrion.',
    uri:
      'https://www.diana-hunting.com/app/webroot/_resized/uploads/vildtarter/indisk-muntjak--77e2dfeb4e285dc4f1c1ddd8524cc82c.jpg',
  },
  {
    name: 'Nilgiri marten',
    info:
      'The Nilgiri marten is deep brown from head to rump, with the forequarters being almost reddish, with a bright throat ranging in colour from yellow to orange. It has a prominent frontal concavity and is larger than the yellow-throated marten.[2] ',
    uri:
      'https://i.pinimg.com/736x/85/89/6f/85896fe710aef594f5164b688cb9ab21.jpg',
  },
  {
    name: 'Asian Small Clawed Otter',
    info:
      'Asian Small Clawed Otter is the smallest otter species in the world,mostly found in mangrove forest, freshwater and swamp. This small aquatic animal is evaluated as vulnerable and feed mainly on crab,molluscs and fish.',
    uri: 'https://www.cotswoldwildlifepark.co.uk/wp-content/uploads/otter.jpg',
  },
  {
    name: 'Malabar Large Spotted Civet',
    info:
      'Malabar Large Spotted Civet is one of the species of viverrid found in India,endemic to the Western Ghats. The Malabar civet or Viverra civettina is critically endangered and threatened by habitat destruction.',
    uri:
      'https://3.bp.blogspot.com/-2C3V2VGviGA/WY81N6vVVrI/AAAAAAAAAGQ/jL0v1QY6Q74RMvk6996p4naAZKHKfeW1wCLcBGAs/s640/1.jpg',
  },
  {
    name: 'Indian Leopard',
    info:
      'The Indian leopard (Panthera pardus fusca) is a leopard subspecies widely distributed on the Indian subcontinent. The species Panthera pardus is listed as Vulnerable on the IUCN Red List because populations have declined following habitat loss and fragmentation, poaching for the illegal trade of skins and body parts, and persecution due to conflict situations.',
    uri: 'https://www.naturepl.com/cache/pcache2/01630727.jpg',
  },
  {
    name: 'Black Panther',
    info:
      'A black panther is the melanistic colour variant found in members of the genus Panthera, particularly of the leopard (P. pardus) in Asia and Africa, and the jaguar (P. onca) in the Americas. Black panthers of both species have excess black pigments, but their typical spotted markings are also present.',
    uri:
      'https://cdn.britannica.com/78/186778-050-73CF4F25/black-panther-leopards-Africa-Central-jaguars-South.jpg',
  },
  {
    name: 'Black and Orange Flycatcher',
    info:
      'The black-and-orange flycatcher or black-and-rufous flycatcher (Ficedula nigrorufa) is a species of flycatcher endemic to the central and southern Western Ghats, the Nilgiris and Palni hill ranges in southern India.',
    uri:
      'https://upload.wikimedia.org/wikipedia/commons/d/d4/Black_and_Orange_Flycatcher.jpg',
  },
  {
    name: 'Rufous Babbler',
    info:
      'The rufous babbler (Argya subrufa) is an endemic species of bird found in the Western Ghats of southern India of the family Leiothrichidae It is dark brown and long tailed, and is usually seen foraging in noisy groups along open hillsides with a mixture of grass, bracken and forest.',
    uri:
      'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/150490511/1800',
  },
  {
    name: 'Galaxy Frog',
    info:
      'This species is part of the Microhylid frog family and molecular data has shown that the initial divergence of the Microhylidae family to have taken place about 66 millions of years ago, or immediately after the Cretaceous extinction event.',
    uri:
      'https://www.edgeofexistence.org/wp-content/uploads/2019/04/Melanobatrachus-indicus_Rajkumar-KP_1.jpg',
  },
  {
    name: 'Malabar Gliding Frog',
    info:
      'The Malabar gliding frog or Malabar flying frog (Rhacophorus malabaricus) is a rhacophorid tree frog species found in the Western Ghats of India.',
    uri:
      'https://allyouneedisbiology.files.wordpress.com/2015/08/frog_m_1804347a.jpg',
  },
];

interface RowItemProps {
  id: string | number;
  name: string;
  info: string;
  uri: string;
}

const RowItem: React.FC<RowItemProps> = ({ name, info, uri }) => {
  return (
    <View style={styles.rowContainer}>
      <Image
        style={styles.image}
        source={{
          uri,
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description} numberOfLines={4}>
          {info}
        </Text>
      </View>
    </View>
  );
};

const ExampleList: React.FC = () => {
  const onDragEnd = (updatedList: Array<DataItem>) => {
    console.log(`updated Positions, ${JSON.stringify(updatedList)}`);
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.introText}>Touch and hold to begin sorting</Text>

      <DraggableList onDragEnd={onDragEnd} rowHeight={100} data={data}>
        {/*This is just an example, you can render your list with which ever logic pleases you*/}
        {data.map(({ name, info, uri }) => {
          return (
            <RowItem id={name} key={name} name={name} uri={uri} info={info} />
          );
        })}
      </DraggableList>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
  },
  introText: {
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  rowContainer: {
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  infoContainer: {
    display: 'flex',
    flex: 1,
    paddingRight: 10,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  name: {
    fontSize: 14,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 11,
  },
});

export default ExampleList;
