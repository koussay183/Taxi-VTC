import React, { useState } from 'react';
import { firestore as db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { IoIosSend, IoMdCall } from 'react-icons/io';
import { FaDog, FaGetPocket, FaLocationArrow, FaPhone, FaTaxi, FaUser } from 'react-icons/fa';
import { FaBoxesPacking, FaLocationDot, FaLocationPin, FaPerson, FaUserGroup } from 'react-icons/fa6';
import { IoCheckmarkDoneCircle, IoTime } from 'react-icons/io5';
import { MdAlternateEmail, MdCallMissedOutgoing, MdContactPhone, MdDateRange, MdOutlineAlternateEmail } from 'react-icons/md';
import { AiFillMessage } from 'react-icons/ai';

function Home() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    animal: false,
    packages: false,
    date: '',
    time:'',
    email: '',
    phone: '',
    name: ''
  });
  const [contactFormData, setContactFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  
  const [showDone, setshowDone] = useState(false)
  const [showDoneContact, setshowDoneContact] = useState(false)
  const [toSug, settoSug] = useState([])
  const [fromSug, setfromSug] = useState([])

  const handleAutoCompleteFrom = async (e) => {

    if (e.target.value === "") {
      return 0;
    }

    try {
      const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${e.target.value}&apiKey=aef5326bee04423eba8077da8ca4fd04`)
      const data = await res.json()
      setfromSug(data?.features)
    } catch (error) {
      console.log(error);
    }
  }
  const handleAutoComplete = async (e) => {

    if (e.target.value === "") {
      return 0;
    }

    try {
      const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${e.target.value}&apiKey=aef5326bee04423eba8077da8ca4fd04`)
      const data = await res.json()
      settoSug(data?.features)
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'requests'), {
        ...formData,
        status: 'waiting'
      });
      setshowDone(true)
      setTimeout(() => {
        setshowDone(false)
        e.target?.reset()
      }, 4000);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value
    });
  };
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contacts'), {
        ...contactFormData,
        timestamp: new Date()
      });
      setshowDoneContact(true)
      setTimeout(() => {
        setshowDoneContact(false)
      }, 3000);
      setContactFormData({
        fullName: '',
        email: '',
        message: ''
      });
      e.target.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <div className='Home'>

      <nav>
        <div className='innerNav'>
          <h1>Taxi&VTC.</h1>
          <div>
            <a href='#booking'>Réservez</a>
            <a href='tel:+33749427104'><IoMdCall />Appelle-Nous</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        
        <h1>La meilleure façon de se déplacer en ville</h1>
        <p>Notre service de taxi rapide et fiable est là pour vous aider à vous déplacer en ville sans tracas.</p>
        <div>
          <button onClick={()=>document.getElementById('booking').scrollIntoView()}><FaGetPocket />Réservez un taxi</button>
          <a href='tel:+33749427104'><IoMdCall />appelle-nous</a>
        </div>
        
      </section>

      {/* About Section */}
      <section className="about">
        <span className='shape1'></span>
        <span className='shape2'></span>
        <h2>À propos de notre compagnie</h2>
        <p>Service de taxi professionnel et dédié en ligne.</p>
        <div>
          <div>
            <div style={{backgroundImage : "linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8) ),url('https://images.pexels.com/photos/2168974/pexels-photo-2168974.jpeg')"}}><span>10 ans</span> d'expérience</div>
            <div style={{backgroundImage : "linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8) ),url('https://images.pexels.com/photos/8247/pexels-photo.jpg')"}}><span>26k</span> véhicules</div>
            <div style={{backgroundImage : "linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8) ),url('https://images.pexels.com/photos/5835348/pexels-photo-5835348.jpeg')"}}><span>32k</span> clients heureux</div>
          </div>
          <button>Découvrir plus</button>
        </div>
      </section>

      {/* Pricing Section */}
      <section className='pricing'>
        <h1>des tarifs fix</h1>
        <span></span>
        <div className='pricingHolder'>
          <div>
            <span></span>
            <label>80€</label>
            <p><FaLocationPin/>Aéroport CDG</p>
            <p><MdCallMissedOutgoing />Paris</p>
          </div>
          <div>
            <span></span>
            <label>60€</label>
            <p><FaLocationPin/>Aéroport Orly</p>
            <p><MdCallMissedOutgoing />Paris</p>
          </div>
          <div>
            <span></span>
            <label>39€</label>
            <p><FaLocationPin/>Paris</p>
            <p><MdCallMissedOutgoing />Paris</p>
          </div>
        </div>
        <div className='pracingHeureHolder'>
          <span></span>
          <label>70€ / Heure</label>
          <p><FaTaxi />Mise à disposition</p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking" id='booking'>
        
        {showDone && <div className='bookingSent'>
          <IoCheckmarkDoneCircle />
          nous vous appellerons sur votre numéro
        </div>}
        <h2><FaTaxi />Réservez votre taxi en ligne</h2>
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <span>
            <div>
            <label>
            <FaLocationPin />Départ
            </label>
            <input type="text" name="from" id='from' placeholder="Taper Départ" required onChange={(event)=>handleAutoCompleteFrom(event)}/>
            {fromSug.length >=1 && <div className='autoComplete'>
              {fromSug.map(to => (<div className='suggsetion' data-value={to?.properties?.name || to?.properties?.formatted } onClick={(e)=>{
                document.getElementById("from").value = e.target?.getAttribute("data-value");
                setFormData({...formData,from : e.target?.getAttribute("data-value")})
                setfromSug([])
              }}>
                <FaLocationDot /> {to?.properties?.name || to?.properties?.formatted}
              </div>))}
            </div>}
          </div>
          <div>
            <label>
            <FaLocationArrow />Arrivée
              
            </label>
            <input type="text" name="to" id='to' placeholder="Taper Arrivée" required onChange={(event)=>handleAutoComplete(event)}/>
            {toSug.length >=1 && <div className='autoComplete'>
              {toSug.map(to => (<div className='suggsetion' data-value={to?.properties?.name || to?.properties?.formatted} onClick={(e)=>{
                document.getElementById("to").value = e.target?.getAttribute("data-value");
                settoSug([])
                setFormData({...formData,to : e.target?.getAttribute("data-value")})
              }}>
                <FaLocationDot /> {to?.properties?.name || to?.properties?.formatted}
              </div>))}
            </div>}
          </div>
          </span>
          <span>
          <div>
            <label>
            <FaUserGroup />NB.Places
              
            </label>
            <input type="number" defaultValue={1} name="seats" placeholder="Taper Nombre de places" required />
          </div>
          </span>
          <span>
            <div className='checkbox-wrapper-9'>
            <label>
            <FaDog />Animal
              
            </label>
            <input type="checkbox" name="animal" className='tgl tgl-flat' id="cb4-9" />
            <label class="tgl-btn" for="cb4-9"></label>
          </div>
          <div className='checkbox-wrapper-9'>
            <label>
            <FaBoxesPacking />Bagage
              
            </label>
            <input type="checkbox" name="packages" className='tgl tgl-flat' id="cb4-10"/>
            <label class="tgl-btn" for="cb4-10"></label>
          </div>
          <div>
            <label>
            <IoTime />Time
              
            </label>
            <input type="time" name="time" required />
          </div>
          <div>
            <label>
            <MdDateRange />Date
              
            </label>
            <input type="date" name="date"  />
          </div>
          </span>
          <span>
          <div>
            <label>
            <FaPhone />téléphone
              
            </label>
            <input type="tel" name="phone" placeholder="Taper Numéro de téléphone" required />
          </div>
          </span>
          <span><div>
            <label>
            <MdAlternateEmail />Email
              
            </label>
            <input type="email" name="email" placeholder="Taper Email"  />
          </div>
          
          <div>
            <label>
            <FaPerson />Nom
              
            </label>
            <input type="text" name="name" placeholder="Taper Nom"  />
          </div></span>
          
          <button type="submit">Réserver maintenant</button>
        </form>
      </section>

      {/* Footer Section */}
      <footer>
      <div className="ContactUs">
        {showDoneContact && <div className='bookingSent'>
            <IoCheckmarkDoneCircle />
            nous vous enverrons un e-mail
          </div>}
            <div className='innerContactUs'>
                <form onSubmit={handleContactSubmit}>
                    <h1>Contactez Nous</h1>
                    <div>
                        <label><FaUser/>Nom et Prénom</label>
                        <input type='text' required value={contactFormData.fullName} onChange={handleContactChange} name="fullName" placeholder='Taper Nom et Prénom...'></input>
                    </div>
                    <div>
                        <label><MdOutlineAlternateEmail/>Email</label>
                        <input type='email' placeholder='Taper Email...' required value={contactFormData.email} onChange={handleContactChange} name="email"></input>
                    </div>
                    <div>
                        <label><AiFillMessage/>Message</label>
                        <textarea placeholder='Taper Message...' required value={contactFormData.message}onChange={handleContactChange}name="message"></textarea>
                    </div>
                    <input type='submit' className='submitInContact' value="Envoyer"></input>
                </form>
                <div className='contactUsSus'>
                    <h1>Nous serions ravis de vous entendre.</h1>
                    <span></span>
                    <span></span>
                    <span></span>
                    <div></div>
                </div>
            </div>
        </div>
        <div className='ContactInfos'>
          <p><MdOutlineAlternateEmail/> taxi.vtc1@gmail.com</p>
          <p><MdContactPhone/> +33 749 427 104</p>
          <p><FaLocationPin/> 95700 Roissy-en-France, France</p>
        </div>
      </footer>
    </div>
  )
}

export default Home