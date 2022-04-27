import React from 'react';
import ReactPlayer from 'react-player';
import {graphql, useStaticQuery} from 'gatsby';
import GlobalImage from './Image';

export {Audio} from './Audio';

export function Quote({author, children}) {
  return (
    <figure className="not-prose border-l-2 border-primary pl-8 my-12">
      <blockquote className="text-xl xl:text-3xl mb-4 italic leading-normal font-medium ">
        {children}
      </blockquote>
      <figcaption className="text-dark text-sm lg:text-base">{author}</figcaption>
    </figure>
  );
}

export function Conclusion({children}) {
  return (
    <div className="bg-light p-8 pb-9 text-dark rounded-2xl  ">
      <h3 className="!mt-0 !mb-6 text-black ">Conclusion</h3>
      <p className="mb-0">{children}</p>
    </div>
  );
}

const r = new RegExp('^(?:[a-z]+:)?//', 'i');

export function Image({type, src, title, alt}) {
  const {images} = useStaticQuery(graphql`
    {
      images: allFile(filter: {sourceInstanceName: {eq: "images"}}) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  `);

  const isRelative = !r.test(src);

  return (
    <figure className="not-prose first:mt-0 my-12">
      {isRelative ? (
        <GlobalImage
          className="mt-0 mb-4 w-full"
          image={images.nodes.find(({relativePath}) => relativePath === src)}
        />
      ) : (
        <img src={src} alt={alt} className="mt-0 mb-4" />
      )}
      <figcaption className="text-xs text-gray-400">{title}</figcaption>
    </figure>
  );
}

export function Megaphone({id}) {
  return (
    <iframe
      frameBorder="no"
      height="200"
      scrolling="no"
      src={`https://player.megaphone.fm/${id}`}
      width="100%"
    />
  );
}

export function Youtube({id, title}) {
  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${id}`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

export function AudioGrid({children}) {
  return <div className="grid sm:grid-cols-2 sm:gap-10 my-16">{children}</div>;
}

export function Video({url}) {
  return (
    <div className="video-wrapper my-16">
      <div className="relative not-prose" style={{paddingTop: '56.25%'}}>
        <ReactPlayer
          controls
          url={url}
          className="absolute top-0 left-0 "
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
