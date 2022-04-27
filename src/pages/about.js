import * as React from 'react';
import classNames from 'classnames';
import {graphql} from 'gatsby';
import Layout from '../components/Layout';
import LogoExt from '../svg/logo.extended.component.svg';
import ExploreIcon from '../svg/about-explore-icon.svg';
import BasicsIcon from '../svg/about-basics-icon.svg';
import CheckIcon from '../svg/check-icon.svg';
import Image from '../components/Image';
import Button from '../components/Button';

export default function About({
  data: {
    images: {nodes: images},
  },
}) {
  return (
    <Layout spacing={false}>
      <header className="my-16 lg:my-24 text-center max-w-screen-2xl mx-auto">
        <h2 className="text-primary font-semibold mb-3">Music Branding Basics</h2>
        <h1 className="text-6xl mb-6 font-semibold">About</h1>
        <p className="text-gray-500 lg:w-1/2 xl:w-3/12 mx-auto">
          Find out the behind the scenes and how you can contribute to the growth of this project.
        </p>
      </header>
      <section className="px-3 py-16 md:py-32 text-left bg-gray-50">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2   items-center">
          <div>
            <LogoExt className="text-primary mb-16 w-3/4 md:w-5/12 lg:mx-auto h-full" />
          </div>
          <div>
            <h3 className="text-primary font-semibold">The idea behing the platform</h3>
            <h2 className="text-4xl mt-3 mb-4 font-semibold">
              The central hub for music branding lovers
            </h2>
            <p className="lg:text-lg text-gray-500 ">
              The platform has been primarily thought for academic use and personal knowledge, in
              order to grow and foster the basic understanding of what music branding and how it
              could be beneficial for Communication Designers in current and future situations.
              Nonetheless, it is open to anybody who wants to learn and develop ideas on the topic.
              It is part of a bigger thesis project developed for the MsC in Communication Design at
              Politecnico di Milano.
            </p>
          </div>
        </div>
      </section>
      <AboutSection
        icon={BasicsIcon}
        title="Learn the basics"
        listItems={[
          'Get acquainted with the basic terminology',
          'Deep dive into the process of music branding',
          'Imagine the future of music branding and related audio technology',
        ]}
        image={images.find(({relativePath}) => relativePath === 'about/basics.png')}
      >
        Start by exploring the basics of music terminology, music perception and music branding
        defintion.
      </AboutSection>
      <AboutSection
        icon={ExploreIcon}
        title="Explore Case studies"
        listItems={[
          'Choose from a variety of case studies',
          'Read curated descriptions of projects',
          'Multimedia material and bonus content included',
        ]}
        image={images.find(({relativePath}) => relativePath === 'about/case-studies.png')}
        reverse
      >
        Start by exploring the basics of music terminology, music perception and music branding
        defintion.
      </AboutSection>
      <AboutSection
        icon={BasicsIcon}
        title="Contribute"
        listItems={[
          'Click on the contribute call to action ',
          'Head over to github.com',
          'Suggest your edit and wait for the approval process',
        ]}
        image={images.find(({relativePath}) => relativePath === 'about/contribute.png')}
      >
        Feel like something could be improved or simply want to report mistakes and errors along the
        way?
      </AboutSection>
      <section className=" py-16 md:py-32 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-page text-center">
          <div>
            <h2 className="text-primary  font-semibold text-4xl ">Let’s keep in touch!</h2>
            <p className="lg:text-lg text-gray-500 my-8">
              Want to know more? Please do not hesitate to contact me or{' '}
              <br className="hidden lg:inline-block" /> downlaod the full report to get to know
              more!
            </p>
            <p>
              <Button
                primary
                large
                component="a"
                href="https://www.linkedin.com/in/andrea-silvano/"
                target="_blank"
              >
                Contact me
              </Button>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function AboutSection({icon: Icon, title, children, listItems, image, reverse}) {
  return (
    <section className="px-page py-16 md:py-32 text-left overflow-hidden">
      <div
        className={classNames(
          'max-w-screen-xl mx-auto grid gap-x-24 md:grid-cols-2 items-center',
          reverse && 'divide-x-reverse'
        )}
      >
        {reverse && (
          <div className="row-start-2 lg:row-start-auto">
            <Image image={image} className="md:scale-125 2xl:scale-150 origin-right" />
          </div>
        )}
        <div>
          <Icon />
          <h2 className="font-semibold text-2xl mb-4 mt-6">{title}</h2>
          <p className="mb-8 text-dark">{children}</p>
          <ul>
            {listItems.map(item => (
              <li key={item} className="grid grid-cols-[28px_auto] gap-x-3 mb-5">
                <CheckIcon />
                <p className=" text-dark text-base">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        {!reverse && (
          <div>
            <Image image={image} className="md:scale-125 2xl:scale-150 origin-left" />
          </div>
        )}
      </div>
    </section>
  );
}

export const query = graphql`
  {
    images: allFile(filter: {relativeDirectory: {eq: "about"}}) {
      nodes {
        relativePath
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;
