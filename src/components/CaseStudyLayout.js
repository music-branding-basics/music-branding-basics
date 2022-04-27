import React from 'react';
import {graphql, Link, navigate} from 'gatsby';
import {MDXProvider} from '@mdx-js/react';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import Layout from './Layout';
import * as MdxComponents from './MDXComponents';
import Button from './Button';
import Arrow from '../svg/arrow-up-right.svg';

function Quote({author, children}) {
  return (
    <figure className="not-prose border-l-2 border-primary pl-8 my-12">
      <blockquote className="text-xl xl:text-3xl mb-4 italic leading-normal font-medium ">
        {children}
      </blockquote>
      <figcaption className="text-dark text-sm lg:text-base">{author}</figcaption>
    </figure>
  );
}

function Conclusion({children}) {
  return (
    <div className="bg-light p-8 pb-9 text-dark rounded-2xl  ">
      <h3 className="!mt-0 !mb-6 text-black ">Conclusion</h3>
      <p className="mb-0">{children}</p>
    </div>
  );
}

function Image({type, src, title, alt}) {
  return (
    <figure className="not-prose first:mt-0 my-12">
      <img src={src} alt={alt} className="mt-0 mb-4" />
      <figcaption className="text-xs">{title}</figcaption>
    </figure>
  );
}

export default function DocLayout({data: {mdx, allMdx}, pageContext: {next, previous}}) {
  const {
    frontmatter: {title, subtitle, chapter},
    wordCount: {words},
  } = mdx;

  return (
    <Layout title={title}>
      <div className="mb-16 text-center">
        <Button className="mx-auto" onClick={() => navigate(-1)}>
          <Arrow className="rotate-[-135deg] py-0.5 h-3 w-3 mr-2 inline-block align-middle" />
          Back
        </Button>
      </div>
      <div className="text-center">
        <h1 className="text-4xl xl:text-5xl font-semibold mb-4 xl:mb-8">{title}</h1>
        <h2 className="text-lg text-dark mb-8">{subtitle}</h2>
      </div>
      <article
        className="
          case-study
          max-w-none prose text-lg
          prose-headings:text-black prose-headings:font-semibold
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-8
          prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-xl prose-h3:lg:text-2xl
          prose-hr:border-gray-200
          prose-li:text-dark
          prose-p:text-dark prose-p:mt-0 prose-p:mb-5
          prose-table:text-center prose-table:text-sm prose-table:align-middle
          prose-th:bg-primary-200 prose-th:p-4 prose-th:align-middle prose-th:font-normal
          prose-th:border prose-th:border-dark prose-th:border-[0.5]
          prose-td:p-4 prose-td:align-middle prose-td:border prose-td:border-dark prose-td:border-[0.5]
          pros-a:text-black prose-a:hover:text-primary prose-a:active:text-primary-dark prose-a:visited:text-black"
      >
        <MDXProvider components={{img: MdxComponents.Image, ...MdxComponents}}>
          <MDXRenderer frontmatter={mdx.frontmatter}>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </article>
      <div className="border-t border-t-gray-200 pt-4 pb-12 mt-16 lg:mt-32 flex justify-between xl:col-span-8">
        <div>
          {previous && (
            <Link
              to={previous.path}
              className="border border-gray-200 py-2 px-3 rounded-xl text-black shadow-sm text-xs hover:bg-light active:bg-light"
            >
              {'<-'} Prev
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link
              to={next.path}
              className="border border-gray-200 py-2 px-3 rounded-xl text-black shadow-sm text-xs hover:bg-light active:bg-light"
            >
              Next {'->'}
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query CasePostQuery($id: String) {
    mdx(id: {eq: $id}) {
      id
      body
      frontmatter {
        title
        subtitle
        short_description
        tags
      }
      wordCount {
        words
      }
    }
    allMdx(
      filter: {frontmatter: {chapter: {eq: null}}}
      sort: {fields: [frontmatter___chapter, frontmatter___paragraph], order: [ASC, ASC]}
    ) {
      group(field: frontmatter___chapter) {
        fieldValue
        nodes {
          id
          body
          frontmatter {
            title
            subtitle
            short_description
            tags
          }
        }
      }
    }
  }
`;
