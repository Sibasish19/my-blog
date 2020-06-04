import React from 'react';
import { graphql } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Layout from '../components/Layout';
import Head from '../components/Head';

export const query = graphql`
	query($slug: String) {
		contentfulBlogPost(slug: { eq: $slug }) {
			title
			publishedDate(formatString: "MMM Do, YYYY")
			body {
				json
			}
		}
	}
`;

const Blog = ({ data }) => {
	const options = {
		renderNode: {
			'embedded-asset-block': ({ data }) => {
				const alt = data.target.fields.title['en-US'];
				const url = data.target.fields.file['en-US'].url;

				return <img src={url} alt={alt} />;
			}
		}
	};

	const title = data.contentfulBlogPost.title;

	return (
		<Layout>
			<Head title={title} />
			<h1>{title}</h1>
			<p>Posted on: {data.contentfulBlogPost.publishedDate}</p>
			{documentToReactComponents(
				data.contentfulBlogPost.body.json,
				options
			)}
		</Layout>
	);
};

export default Blog;
