import { Link } from 'react-router-dom';
import styles from 'assets/style/home.module.scss';

const Home = () => {
  const palette = [
    '#ff99c8',
    '#fcf6bd',
    '#d0f4de',
    '#a9def9',
    '#e4c1f9'
  ];

  const games = [
    {
      id: 0,
      name: 'Game 1',
      coverImage: 'https://picsum.photos/600/400?1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat, lorem non suscipit porttitor, nunc quam eleifend turpis, ut dignissim tortor mauris ac eros. Pellentesque.',
    },
    {
      id: 1,
      name: 'Game 2',
      coverImage: 'https://picsum.photos/600/400?2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat, lorem non suscipit porttitor, nunc quam eleifend turpis, ut dignissim tortor mauris ac eros.',
    },
    {
      id: 2,
      name: 'Game 3',
      coverImage: 'https://picsum.photos/600/400?3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat, lorem non suscipit porttitor, nunc quam eleifend turpis, ut dignissim tortor mauris ac eros. Pellentesque mollis consequat imperdiet',
    },
    {
      id: 3,
      name: 'Game 4',
      coverImage: 'https://picsum.photos/600/400?4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat',
    }
  ];

  return (
    <div className={styles.home}>
      <main>
        <header>
          <h1>
            <img src='https://upload.wikimedia.org/wikipedia/commons/0/0a/Virus_green.svg' alt='logo' />
            IST&apos;eirb (insérer un nom ici)</h1>
          <h2>Sous-titre</h2>
        </header>
        <div className={styles.container}>
          <div className={styles.games}>
            {games.map((game, index) => (
              <Link className={styles.game} key={game.id} style={{ backgroundColor: palette[index % palette.length] }} to={`/game/${index}`}>
                <img src={game.coverImage} alt={game.name} />
                <h3>{game.name}</h3>
                <p>{game.description}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>Ex laborum placeat est perspiciatis nulla aut placeat necessitatibus! </h1><p>Lorem ipsum dolor sit amet. Ut autem voluptatem qui quia repellendus <strong>Qui consequatur a minima voluptatem eos internos fuga eos voluptas iste</strong>. Ut modi quia non odio nihil <em>Qui galisum ad maiores explicabo a quasi voluptate</em>. Id eveniet veniamEt voluptates ea dolorem ipsam qui praesentium aliquam. Non nostrum voluptate et odit voluptatemest sunt ab cupiditate dolorem qui unde sint. </p><h2>Eum officiis magni et doloribus minima. </h2><p>Aut delectus autem <strong>Sed ducimus vel nobis dicta hic quasi nihil</strong> et maiores minus vel quidem repudiandae. Nam reiciendis culpa id temporibus dolore <a href='https://www.loremipzum.com' target='_blank' rel='noreferrer'>Aut ipsum et inventore voluptatem</a> 33 quod voluptatem sed cumque inventore et eaque molestias! Et sint voluptas ut velit ipsam <em>Et galisum At magnam voluptatem ea minima laboriosam qui odio omnis</em>! Est blanditiis similique ut numquam omnisaut doloribus id facere omnis! </p><ul><li>Ut numquam facilis aut quis animi et porro velit. </li><li>Et animi voluptatem aut velit repudiandae? </li><li>Est rerum laudantium qui officiis error ut culpa error ab laboriosam eaque. </li><li>Ab officia voluptas aut nisi quod aut odio iusto ut asperiores deleniti. </li></ul><dl><dt><dfn>Et sunt dolorem. </dfn></dt><dd>Aut voluptatem laboriosam ut placeat odit et illo quos ad galisum impedit. </dd><dt><dfn>Et minus delectus ut laborum quia! </dfn></dt><dd>Eum suscipit fuga aut incidunt excepturi aut ipsum rerum. </dd><dt><dfn>In recusandae enim. </dfn></dt><dd>Et quia velit quo molestiae illum ad earum doloremque. </dd></dl><h3>Et maiores omnis est reprehenderit aliquam. </h3><p>Quo deserunt deserunt est debitis quisquamin dolorem. Ut laborum magnamEst porro sit internos quia quo nemo distinctio in expedita quae non necessitatibus voluptate et minus aliquid. Id deleniti officia eum architecto facere <strong>Aut deleniti</strong>. </p>
          </div>
        </div>
        <footer>
          <p>© 2022 - HTTP 413 - Team Too Large</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
