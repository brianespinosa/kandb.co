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
        <h2>Location</h2>
        <p>
          Chambers at Phoenix Hotel
          <br />
          601 Eddy Street
          <br />
          San Francisco, CA 94109
        </p>

        <h2>Schedule</h2>
        <p>
          4pm arrival
          <br />
          Ceremony
          <br />
          Cocktail Hour and Reception to Follow
        </p>

        <h2>Attire</h2>
        <p>Cocktail Attire</p>

        <h2>RSVP</h2>
        <p>Please use the form below to RSVP by March 1st.</p>
        <Button
          content='Click Here To RSVP'
          href='https://forms.gle/iitNLVPrZsAMp5SG7'
        />

        <h2>Registry</h2>
        <Button
          content='Heath Ceramics'
          href='https://www.heathceramics.com/apps/giftregistry/registry/83271'
        />
        <Button
          content='Zola'
          href='http://www.zola.com/registry/kandaceandbrian'
        />

        <h2>Travel</h2>
        <p>
          For a 15% discount on full-price rooms booked directly with Phoenix,
          use the code “direct” under Corporate/Promotion Code on their website
        </p>

        <h2>About the Phoenix</h2>
        <p>
          One of the first things we bonded over was our love of music, so our
          venue seems the perfect fit
        </p>
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
      </main>
    </div>
  );
}

export default App;
