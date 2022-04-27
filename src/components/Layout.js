import * as React from 'react';
import PropTypes from 'prop-types';
import {graphql, Link, useStaticQuery} from 'gatsby';
import slugify from 'slugify';
import {useEffect, useState} from 'react';
import classNames from 'classnames';
import {useMatch} from '@reach/router';
import LogoExt from '../svg/logo.extended.component.svg';
import Logo from '../svg/logo.component.svg';
import PlusIcon from '../svg/plus.svg';
import BurgerIcon from '../svg/burger.svg';
import Chevron from '../svg/chevron-down.svg';

import Seo from './Seo';

import ccImage from '../images/cc.png';

import '../style/style.css';
import Button from './Button';

export const chapterTitles = ['Music and Emotions', 'Music Branding', 'Why Music Branding?'];

export default function Layout({children, title, description, spacing}) {
  const [menuStatus, setMenuStatus] = useState(false);
  const [subMenu, setSubMenu] = useState(false);

  const indocs = useMatch('/basic-knowledge/*');

  useEffect(() => {
    setSubMenu(indocs);
  }, [indocs]);

  const {allMdx} = useStaticQuery(graphql`
    {
      allMdx(sort: {fields: [frontmatter___chapter, frontmatter___paragraph], order: [ASC, ASC]}) {
        group(field: frontmatter___chapter) {
          fieldValue
          nodes {
            id
            body
            frontmatter {
              title
              subtitle
              chapter
              paragraph
            }
          }
        }
      }
    }
  `);

  return (
    <>
      <Seo title={title} description={description} />
      <nav
        className={classNames(
          'sticky top-0 z-50 bg-white font-base font-sans h-16 xl:h-20 flex items-center border-b border-gray-200',
          spacing && 'mb-16 xl:mb-20'
        )}
      >
        <div className="max-w-screen-xl px-page mx-auto w-full">
          <div className="flex items-center justify-between">
            <div className="flex lg:flex-row items-center w-full">
              <Link to="/" className="mr-20">
                <Logo className="text-primary" />
              </Link>
              <div
                className={classNames(
                  'flex flex-col lg:flex-row lg:items-center justify-between flex-grow',
                  'absolute top-full lg:static bg-white left-0 right-0  transition border-y-gray-200',
                  menuStatus
                    ? ' max-h-[calc(100vh_-_4rem)] border-y pt-2 pb-6 lg:py-0 overflow-y-scroll'
                    : 'max-h-0 lg:max-h-full overflow-hidden',
                  'text-sm '
                )}
              >
                <ul className="lg:flex text-dark ">
                  <li className="py-3 px-4 my-auto">
                    <div className="w-full lg:w-auto flex items-center justify-between">
                      <Link
                        to="/basic-knowledge"
                        partiallyActive
                        className=""
                        activeClassName="lg:text-primary lg:font-semibold"
                      >
                        Basic knowledge
                      </Link>
                      <Chevron
                        onClick={() => setSubMenu(!subMenu)}
                        className={classNames(
                          'lg:hidden transition-transform',
                          !subMenu || 'rotate-180'
                        )}
                      />
                    </div>
                    <nav
                      className={classNames(
                        'lg:hidden mx-4',
                        subMenu ? 'max-h-full' : 'max-h-0 overflow-hidden'
                      )}
                    >
                      <ol className="text-xs mt-1">
                        {allMdx.group.map(g => (
                          <li className="pt-3 last:-mb-1" key={g.fieldValue}>
                            <p className="mb-2 font-medium">{chapterTitles[g.fieldValue - 1]}</p>

                            <ol className="text-dark px-4">
                              {g.nodes.map(({frontmatter: {title}}) => (
                                <li className="mb-2 last:mb-0" key={title}>
                                  <Link
                                    to={`/basic-knowledge/${slugify(title, {lower: true})}`}
                                    className="active:text-primary-dark"
                                    activeClassName="text-primary font-semibold"
                                  >
                                    {title}
                                  </Link>
                                </li>
                              ))}
                            </ol>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  </li>
                  <li className="p-4">
                    <Link
                      to="/case-studies"
                      partiallyActive
                      className=""
                      activeClassName="text-primary font-semibold"
                    >
                      Case Studies
                    </Link>
                  </li>
                  <li className="p-4">
                    <Link
                      to="/about"
                      partiallyActive
                      className=""
                      activeClassName="text-primary font-semibold"
                    >
                      About
                    </Link>
                  </li>
                </ul>
                <div className="px-4 lg:pr-0">
                  <Button primary large className="w-full">
                    Contribute
                  </Button>
                </div>
              </div>
            </div>
            <button onClick={() => setMenuStatus(!menuStatus)} className="lg:hidden text-primary">
              {menuStatus ? <PlusIcon /> : <BurgerIcon />}
            </button>
          </div>
        </div>
      </nav>
      <main
        className={classNames(
          'font-base text-black font-sans ',
          spacing && 'px-page max-w-screen-xl mx-auto'
        )}
      >
        {children}
      </main>

      <footer className="bg-primary text-white font-base font-sans flex items-center">
        <div className="max-w-screen-xl px-3 py-16 mx-auto w-full px-page">
          <div className="flex items-center flex-col lg:flex-row lg:justify-between w-full">
            <div className="items-center w-full lg:w-auto">
              <LogoExt className="block" />
            </div>
            <div className="text-primary-light w-full lg:text-right  ">
              <div className="flex flex-col justify-between h-full w-fit lg:ml-auto">
                <div />

                <p className="opacity-50 mb-4 mt-8">© 2022 Andrea Silvano.</p>
                <a href="https://creativecommons.org/licenses/by-nc/4.0/">
                  <img src={ccImage} className="w- h-7 w-[104px] " />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  spacing: PropTypes.bool,
};

Layout.defaultProps = {
  spacing: true,
};
