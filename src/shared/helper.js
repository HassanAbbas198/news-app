export const formatData = (articles) => {
  const formattedArticles = [];
  let imageUrl;
  let title;
  for (const key in articles) {
    for (const x in articles[key].multimedia) {
      if (articles[key].multimedia[x].subtype === 'popup') {
        imageUrl = `https://www.nytimes.com/${articles[key].multimedia[x].url}`;
      }
    }

    if (articles[key].headline.print_headline) {
      title = articles[key].headline.print_headline;
    } else {
      title = articles[key].headline.main;
    }

    formattedArticles.push({
      id: articles[key]._id,
      title,
      imageUrl,
      description: articles[key].snippet,
      category: articles[key].subsection_name,
      date: articles[key].pub_date,
      url: articles[key].web_url,
    });
  }
  return formattedArticles;
};
