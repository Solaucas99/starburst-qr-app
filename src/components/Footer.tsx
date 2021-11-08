import { NextPage } from 'next';
import React from 'react';

import {
  AiOutlineFacebook,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from 'react-icons/ai';

import { FooterNav } from '@styles/utils/Footer';

const Footer: NextPage = () => (
  <FooterNav>
    <small>Starburst-QR - Created by Lucas Amorim &copy;</small>

    <div className="social">
      <a
        href="https://www.linkedin.com/in/lucas-da-silva-amorim-1384a0177/"
        className="btnSocialIcons"
      >
        <button type="button">
          <AiOutlineLinkedin />
        </button>
      </a>
      <a href="https://github.com/Solaucas99" className="btnSocialIcons">
        <button type="button">
          <AiOutlineGithub />
        </button>
      </a>
      <a href="https://twitter.com/Solaucas99" className="btnSocialIcons">
        <button type="button">
          <AiOutlineTwitter />
        </button>
      </a>
      <a
        href="https://www.instagram.com/amorimlucas0507/"
        className="btnSocialIcons"
      >
        <button type="button">
          <AiOutlineInstagram />
        </button>
      </a>
      <a
        href="https://www.facebook.com/lucas.amorim.1598/"
        className="btnSocialIcons"
      >
        <button type="button">
          <AiOutlineFacebook />
        </button>
      </a>
    </div>
  </FooterNav>
);

export default Footer;
