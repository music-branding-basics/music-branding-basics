import React from 'react';
import {graphql, Link} from 'gatsby';
import {MDXProvider} from '@mdx-js/react';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import slugify from 'slugify';
import Layout, {chapterTitles} from './Layout';
import * as MdxComponents from './MDXComponents';

export default function DocLayout({data: {mdx, allMdx}, pageContext: {next, previous}}) {
  const {
    frontmatter: {title, subtitle, chapter},
    wordCount: {words},
  } = mdx;

  return (
    <Layout title={title}>
      <div className="grid lg:grid-cols-8 auto-rows-min">
        <div className="lg:col-span-2 lg:row-span-2 ">
          <div className="lg:sticky lg:top-40 hidden lg:block">
            <nav>
              <ol className="text-sm">
                {allMdx.group.map(g => (
                  <li className="mb-8" key={g.fieldValue}>
                    <p className="mb-4 uppercase font-medium">{chapterTitles[g.fieldValue - 1]}</p>

                    <ol className="text-dark">
                      {g.nodes.map(({frontmatter: {title}}) => (
                        <li className="mb-3" key={title}>
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
            <h3 className="text-primary font-semibold mb-3">Contribute to this article</h3>
            <button className="block w-full rounded-lg text-center py-3 px-5 bg-primary text-white hover:bg-primary-dark active:bg-primary-darker transition-all">
              Contribute
            </button>
          </div>
        </div>
        <div className="lg:col-start-4 lg:col-span-5">
          <div>
            <div className="p-1 pr-3 mb-8 rounded-full bg-primary-light inline-block w-auto text-primary">
              <span className="rounded-full bg-white py-0.5 px-2 mr-2">Section {chapter}</span>{' '}
              {Math.ceil(words / 200)} mins read
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold mb-4 lg:mb-8">{title}</h1>
          <h2 className="text-lg text-dark mb-8">{subtitle}</h2>
        </div>
        <article
          className="
          lg:col-span-5
          lg:col-start-4
          max-w-none prose text-lg
          prose-headings:text-black prose-headings:font-semibold
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-8
          prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-xl prose-h3:lg:text-2xl
          prose-hr:border-gray-200
          prose-p:text-dark prose-p:mt-0 prose-p:mb-5
          prose-li:text-dark
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
        <div className="border-t border-t-gray-200 pt-4 pb-12 mt-16 lg:mt-32 flex justify-between lg:col-span-8">
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
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: {eq: $id}) {
      id
      body
      frontmatter {
        title
        subtitle
        chapter
      }
      wordCount {
        words
      }
    }
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
`;
