import * as React from 'react';
import {graphql, Link} from 'gatsby';
import {useState} from 'react';
import classNames from 'classnames';
import slugify from 'slugify';
import Layout from '../components/Layout';
import BrandingBasic from '../components/BrandingBasic';

import ClockIcon from '../svg/clock.svg';
import Kebab from '../svg/Kebab.svg';
import Arrow from '../svg/arrow-up-right.svg';
import Image from '../components/Image';

function toggleArrayItem(arr, v) {
  const a = [...arr];
  const i = a.indexOf(v);
  if (i === -1) a.push(v);
  else a.splice(i, 1);

  return a;
}

const tagColors = {
  Finance: 'bg-[#FFF6ED] text-[#C4320A]',
  Healthcare: 'bg-[#ECFDF3] text-[#027A48]',
  Entertainment: 'bg-[#FDF2FA] text-[#C11574]',
  Automotive: 'bg-[#FEF3F2] text-[#B42318]',
  Services: 'bg-[#EFF8FF] text-[#175CD3]',
  Sports: 'bg-[#F9F5FF] text-[#6941C6]',
  'Multi-touchpoint': 'bg-[#F0F9FF] text-[#026AA2]',
  'Single-touchpoint': 'bg-[#FFFAEB] text-[#B54708]',
};

function CaseStudyCard({
  data: {
    frontmatter: {title, short_description, tags, author},
    thumbnail,
  },
}) {
  return (
    <div className="rounded-3xl border border-gray-200 overflow-hidden">
      <div className="aspect-[16/10] bg-black ">
        <Image image={thumbnail} className="w-full h-full object-cover" />
      </div>
      <div>
        <div className="mx-6 grid gap-3 py-8 h-full">
          <p className="font-semibold text-primary text-xs">{author}</p>
          <Link className="group" to={`/case-studies/${slugify(title, {lower: true})}`}>
            <div className="flex justify-between w-full items-center text-2xl mb-3">
              <h3 className=" group-hover:underline font-semibold">{title}</h3>
              <Arrow className="origin-bottom-left transition" />
            </div>
            <p className="text-gray-500 mb-12 min-h-[3rem]">{short_description}</p>
          </Link>
          <div>
            {tags.split(',').map(t => (
              <span
                key={t}
                className={classNames(
                  'text-xs inline-block py-0.5 px-3 rounded-2xl mr-2 last:mr-0 font-medium',
                  tagColors[t] || 'bg-light'
                )}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const taxonomy = [
  [
    <ClockIcon />,
    'Date of creation',
    'Curious to know when the renaissance of recent music branding was? Use the Date of creation fileter to find out what the best years were.',
  ],
  [
    <ClockIcon />,
    'Industry Category',
    'A lot of different indistries are jumping on board the music branding trend. Find out which categories have more affinity with the practice.',
  ],
  [
    <ClockIcon />,
    'Audible touchpoints',
    'Is it just a jingle or a suite of sounds that spans across different media? Find out about holistic experiences in all shapes and forms.',
  ],
];

const selectedSlugs = ['siemens-healthineers', 'mastercard', 'geberit'];
export default function CaseStudies({
  data: {
    allFile: {nodes: caseStudies},
  },
}) {
  const [page, setPage] = useState(0);

  const [selectedFilter, setSelectedFilter] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredCaseStudies = caseStudies.filter(
    ({
      childMdx: {
        frontmatter: {tags},
      },
    }) =>
      !selectedFilter.length ||
      tags?.split(',').some(t => selectedFilter.findIndex(i => i === t) !== -1)
  );

  console.log(
    Array(
      new Set(
        caseStudies.map(c => c.childMdx.frontmatter.tags.split(',').filter(t => Number(t))).flat()
      )
    )
  );

  return (
    <Layout spacing={false}>
      <header className="my-16 lg:my-24 text-center max-w-screen-2xl mx-auto px-page">
        <h2 className="text-primary font-semibold mb-3">Music Branding Basics</h2>
        <h1 className="text-6xl mb-6 font-semibold">Case Studies</h1>
        <p className="text-gray-500 lg:w-1/2 mx-auto">
          Here’s a repository of various case studies of brands that underwent sonic renovation or
          creation in recent times.
        </p>
      </header>
      <section className="px-3 my-16 md:my-32 max-w-screen-xl mx-auto px-page">
        <h2 className="font-semibold text-2xl mb-8">Selected Case Studies</h2>
        <div className="grid gap-10 lg:gap-x-7 gap-y-16 md:grid-cols-3 xl:grid-cols-3">
          {selectedSlugs.map(slug => {
            const current = caseStudies.find(
              ({
                childMdx: {
                  frontmatter: {title},
                },
              }) => slugify(title, {lower: true}) === slug
            );

            return <CaseStudyCard data={current.childMdx} key={current.id} />;
          })}
        </div>
      </section>
      <section className="px-3 py-16 md:py-32 text-center bg-gray-50 px-page">
        <div className="max-w-screen-xl mx-auto">
          <div>
            <h3 className="text-primary font-semibold">Taxonomy</h3>
            <h2 className="text-4xl mt-3 mb-4 font-semibold">
              Filter case studies based on three categories
            </h2>
            <p className="lg:w-1/2 mx-auto lg:text-lg text-gray-500 ">
              Use firters in order to understand the carachteristics of the perfect case study. Mix
              and match from the categories available in this section.{' '}
            </p>
          </div>
          <div className="grid gap-10 lg:gap-x-7 gap-y-16 mt-12 xl:grid-cols-3 ">
            {taxonomy.map(([icon, title, descr], i) => (
              <BrandingBasic key={title} title={title} index={icon}>
                {descr}
              </BrandingBasic>
            ))}
          </div>
        </div>
      </section>
      <section className="px-3 my-16 md:my-32 max-w-screen-xl mx-auto px-page">
        <h2 className="font-semibold text-lg mb-8">All Case Studies</h2>
        <div className="grid lg:grid-cols-3 gap-y-12 gap-x-8 mb-16">
          <div className="lg:col-span-3 md:flex text-xs">
            <div className="relative mr-2 block ">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="group mr-2 mb-2 font-medium rounded-lg px-4 border box-border py-[10px] text-xs"
              >
                Filter <Kebab className="inline-block h-5 w-5" />
              </button>
              <div
                className={classNames(
                  'md:absolute top-full py-2 whitespace-nowrap',
                  dropdownOpen ? 'block' : 'hidden'
                )}
              >
                <div className="md:flex gap-12 w-full md:w-fit grid-cols-3 bg-white border-gray-200 border rounded-2xl py-5 px-5 lg:py-6 lg:px-8">
                  <div>
                    <h3 className="mb-2 font-semibold">Year</h3>
                    {['2022', '2021', '2020', '2019', '2018', '2017', '2015', '2014', '2008'].map(
                      year => (
                        <div key={year} className="text-dark mb-2">
                          <label className="flex items-center hover:text-black">
                            <input
                              type="checkbox"
                              className={classNames('form-checkbox rounded border inline-block')}
                              checked={selectedFilter.indexOf(year) !== -1}
                              onChange={() => setSelectedFilter(s => toggleArrayItem(s, year))}
                            />
                            <span className="ml-2 ">{year}</span>
                          </label>
                        </div>
                      )
                    )}
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Industries</h3>
                    {[
                      'Finance',
                      'Healthcare',
                      'Entertainment',
                      'Automotive',
                      'Services',
                      'Sports',
                    ].map(year => (
                      <div key={year} className="text-dark mb-2">
                        <label className="flex items-center text-xs hover:text-black">
                          <input
                            type="checkbox"
                            className={classNames('form-checkbox rounded border inline-block')}
                            checked={selectedFilter.indexOf(year) !== -1}
                            onChange={() => setSelectedFilter(s => toggleArrayItem(s, year))}
                          />
                          <span className="ml-2 ">{year}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold whitespace-nowrap">Touchpoint</h3>
                    {['Multi-touchpoint', 'Single-touchpoint'].map(year => (
                      <div key={year} className="text-dark mb-2">
                        <label className="flex items-center text-xs hover:text-black">
                          <input
                            type="checkbox"
                            className={classNames('form-checkbox rounded border inline-block')}
                            checked={selectedFilter.indexOf(year) !== -1}
                            onChange={() => setSelectedFilter(s => toggleArrayItem(s, year))}
                          />
                          <span className="ml-2 ">{year}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {selectedFilter.map(f => (
              <button
                className={classNames(
                  'group mr-2 mb-2 font-medium rounded-lg px-4 py-[10px] text-xs',
                  tagColors[f] || 'bg-light text-dark'
                )}
                key={f}
                onClick={() => setSelectedFilter(s => toggleArrayItem(s, f))}
              >
                {f} <span className="ml-2 text-lg leading-none align-text-top">{'\u2715'}</span>
              </button>
            ))}
          </div>
          {filteredCaseStudies.slice(page * 6, (page + 1) * 6).map(c => (
            <CaseStudyCard key={c.id} data={c.childMdx} />
          ))}
        </div>
        <div className="border-t border-gray-200 text-center">
          {Array(Math.ceil(caseStudies.length / 6))
            .fill(0)
            .map((_, p) => (
              <button
                className={classNames(
                  'p-3 w-10 inline-block aspect-square leading-none rounded-lg mt-5 mr-1',
                  page === p && 'text-primary bg-primary-light'
                )}
                onClick={() => setPage(p)}
                key={p}
              >
                {p + 1}
              </button>
            ))}
        </div>
      </section>
    </Layout>
  );
}

export const query = graphql`
  {
    allFile(
      filter: {sourceInstanceName: {eq: "case-studies"}}
      sort: {order: [ASC], fields: [relativePath]}
    ) {
      nodes {
        id
        childMdx {
          frontmatter {
            title
            subtitle
            short_description
            tags
            author
          }
          thumbnail: childFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`;
