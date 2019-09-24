import React from 'react';
import logo from './kb_title.svg';
import styles from './App.module.css';
import Button from './Button';

function App() {
  return (
    <div className={styles._}>
      <header>
        <h1>
          Kandace & Brian
          <img src={logo} className={styles.Logo} alt='Kandace & Brian' />
        </h1>
      </header>
      <main>
        <h2>Venue</h2>
        <p>
          Phoenix Hotel & Chambers
          <br />
          San Francisco, CA
        </p>
        <p>
          One of the first things we bonded over was our love of music, so our
          venue seems the perfect fit
        </p>
        <h3>About the Phoenix</h3>
        <p>
          Sitting at the intersection of the Tenderloin, Civic Center and Little
          Saigon districts, the Phoenix is an oasis amid the grit of downtown
          San Francisco. More legend than hip hotel, it is a second home to
          generations of traveling bands, a stone’s throw from the Bill Graham
          Civic Auditorium, the Great American Music Hall and other iconic live
          music venues, and a cornerstone of the city’s storied musical past.
        </p>
        <p>
          The rock n’ roll spirit of this weird and wonderful 1950’s-era motor
          court hotel reflects the layers of history that have unfolded here.
          The Phoenix continues to be a pitstop for musicians passing through
          and intrepid travelers looking to have a good time in the heart of the
          city.
        </p>
        <Button content='Chambers' href='https://chambers-sf.com' />
        <Button content='Phoenix Hotel' href='https://www.phoenixsf.com' />

        <h2>Travel</h2>
        <p>
          For a 15% discount on full-price rooms booked directly with Phoenix,
          use the code “direct” under Corporate/Promotion Code on their website
        </p>

        <h2>Registry</h2>
        <Button
          content='Heath Ceramics'
          href='https://www.heathceramics.com/apps/giftregistry/registry/83271'
        />
        <Button
          content='Zola'
          href='http://www.zola.com/registry/kandaceandbrian'
        />
      </main>
    </div>
  );
}

export default App;
