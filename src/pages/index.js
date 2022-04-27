import * as React from 'react';
import {graphql, Link} from 'gatsby';
import Layout from '../components/Layout';
import LogoExtInline from '../svg/logo.extended.inline.svg';
import LogoExt from '../svg/logo.extended.component.svg';
import Button from '../components/Button';
import Image from '../components/Image';
import BrandingBasic from '../components/BrandingBasic';

const basics = [
  [
    'Branding theory',
    'A brand is much more than just a product or service: it is an experience that encompasses all aspects of the customer.',
  ],
  [
    'Music Terminology',
    'Used to describe the elements of music. Including names of the different melodies, clefs, dynamics, beats and more.',
  ],
  [
    'Psychoacoustics',
    'How humans process and perceive sound. Studies how we hear sounds, we interpret them, and how they affect us emotionally and psychologically.',
  ],
  [
    'Music Branding process',
    'Creating and developing a brand identity for a company through sound. Including the creation of a sonic logo, brand theme, UI sounds and more.',
  ],
  [
    'Best case studies',
    'Explore 30+ case studies of the best and most succesful corporate sonic identities with videos, snippets of sound and curated descritpions. ',
  ],
  [
    'The future of music branding',
    'Discover what the future of the practice holds for designers and consumers through the analysis of real world experiments with cutting edge tech.',
  ],
];

const melatiros = [
  [
    '4+',
    'Interview to industry KOL',
    'Working in the music branding industry in different companies.',
  ],
  ['35', 'Available case studies', 'Chosen between the best corporations in the world.'],
  ['8', 'Curated case studies', 'Carefully reviewed and discussed with industry KOLs.'],
  ['150+', 'pages in the report', 'In-depth analysis for an accurate picture of music branding.'],
];

// markup
function IndexPage({data: {wave, screenshot}}) {
  return (
    <Layout spacing={false}>
      <section className="pt-16 xl:pt-24 pb-16 overflow-hidden ">
        <div className="px-page max-w-screen-xl mx-auto mb-24">
          <LogoExtInline className="mx-auto hidden md:block text-primary" />
          <LogoExt className="mx-auto  w-1/2 h-full md:hidden text-primary" />
          <h2 className="text-dark text-xl text-center mt-10 lg:mt-6 leading-normal">
            The open-source platform for music branding theory, processes and world renown case
            studies.
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2 md:auto-cols-auto mx-auto">
            <div className="text-right">
              <Button
                large
                primary
                className="w-full md:w-auto inline-block"
                component={Link}
                to="/basic-knowledge"
              >
                Get started
              </Button>
            </div>
            <div>
              <Button
                large
                component="a"
                className="w-full md:w-auto inline-block"
                href="/mbb-report-2022.pdf"
                target="_blank"
              >
                Download report
              </Button>
            </div>
          </div>
        </div>

        <Image alt="Wave image" image={wave} loading="eager" className="scale-110 origin-top" />
      </section>
      <section className="px-page my-16 md:my-32 text-center max-w-screen-xl mx-auto">
        <div>
          <h3 className="text-primary font-semibold">The project’s idea</h3>
          <h2 className="text-4xl mt-3 mb-4 font-semibold">What is music branding basics?</h2>
          <p className="lg:text-lg text-gray-500 ">
            Music Branding basic is a knowlodge platform dedicated to sonic identities that allows
            designers, creatives, music lovers and curious people to deep dive in how a brand can
            sound and be remembered.
          </p>
        </div>
        <div className="grid gap-10 lg:gap-x-7 gap-y-16 mt-12 md:grid-cols-2 xl:grid-cols-3">
          {basics.map(([title, descr], i) => (
            <BrandingBasic key={title} title={title} index={i + 1}>
              {descr}
            </BrandingBasic>
          ))}
        </div>
      </section>
      <section className=" py-16 md:py-32  bg-light">
        <div className="max-w-screen-xl mx-auto px-page">
          <div>
            <h3 className="text-primary font-semibold">The sources</h3>
            <h2 className="text-4xl mt-3 mb-4 font-semibold">World class case studies and KOLs</h2>
            <p className="lg:text-lg text-gray-500 ">
              Thanks to the analysis of the existing academic literature, various interviews with
              Key Opinion Leaders of the industry and hours of case study analysis, this tool should
              be able to prive with the best knowledge out there.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-x-24 items-center lg:mt-16">
            <div className="grid lg:grid-cols-2 my-20 gap-x-8 gap-y-16">
              {melatiros.map(([number, title, text]) => (
                <div className="text-center" key={title}>
                  <p className="text-primary text-6xl mb-3 font-semibold">{number}</p>
                  <h3 className="text-medium mb-2">{title}</h3>
                  <p className="text-dark">{text}</p>
                </div>
              ))}
            </div>
            <Image image={screenshot} />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default IndexPage;

export const query = graphql`
  {
    wave: file(relativePath: {eq: "wave.png"}) {
      childImageSharp {
        gatsbyImageData
      }
    }
    screenshot: file(relativePath: {eq: "folder-screenshot.png"}) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`;
