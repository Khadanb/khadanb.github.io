import type { Publication } from '../types';

/** The site author's name, emphasized in author lists. */
export const SELF_AUTHOR = 'Brandon Khadan';

/** Publications, newest first. */
export const publications: Publication[] = [
  {
    title: 'Using Machine Learning to Correlate Twitter Data and Weather Patterns',
    authors: [
      'Evan Dogariu',
      'Shruti Garg',
      'Brandon Khadan',
      'Ashley Potts',
      'Michael Scornavacca',
    ],
    venue: '2019 IEEE MIT Undergraduate Research Technology Conference (URTC)',
    year: 2019,
    url: 'https://ieeexplore.ieee.org/document/9660487',
    doi: '10.1109/URTC49097.2019.9660487',
    abstract:
      'In the modern era, social media constitutes a large portion of societal interaction. These social media platforms now offer vast amounts of data to perform analyses that correlate online data with real-world phenomena. These correlations have potential applications in not only many parallel aspects of data science but also in social sciences that study human behavior online. This paper conducts a comparative analysis amongst various machine learning algorithms by correlating Twitter text data and weather. These algorithms process tweet data to infer the type of weather. This paper details the implementations, conceptual structures, and advantages and disadvantages of these algorithms. It was determined that the multilayer perceptrons and the naive Bayes classifier were unable to find any significant correlations, and achieved accuracies similar to guessing. On the contrary, both the convolutional and recurrent neural networks reached categorization accuracies well above the baseline test, demonstrating the benefit of considering context and groups of tweets at a time and indicating that there exists some correlation between weather and tweet text data. Ultimately, the recurrent network performed best with a maximum validation accuracy of 65.7%.',
  },
];
