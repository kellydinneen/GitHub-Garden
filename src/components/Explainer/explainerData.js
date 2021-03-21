import * as d3 from "d3";

  export const scaleSelection = (minMax, category, type) => {
    const min = minMax[0];
    const max = minMax[1];

    const scales = {
      stems:{
        quantize:
          d3.scaleQuantize()
            .domain([min, max])
            .range([400, 350, 300, 250, 200, 150, 100]),
        quantizeAbsolute:
          d3.scaleQuantize()
            .domain([0, 360])
            .range([400, 350, 300, 250, 200, 150, 100]),
        threshold:
          d3.scaleThreshold()
            .domain([0.2 * max, 0.4 * max,  0.6 * max, 0.8 * max])
            .range([450, 350, 300, 200, 100]),
        thresholdAbsolute:
          d3.scaleThreshold()
            .domain([10, 30, 90, 360])
            .range([450, 350, 300, 200, 100]),
        linear:
          d3.scaleLinear()
            .domain([min, max])
            .range([400, 100]),
        linearAbsolute:
          d3.scaleLinear()
            .domain([0, 365])
            .range([400, 100])
      },
      flowers:{
        quantize:
          d3.scaleQuantize()
            .domain([min, max])
            .range([0.2, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9]),
        quantizeAbsolute:
          d3.scaleQuantize()
            .domain([0, 100000])
            .range([0.2, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9]),
        threshold:
          d3.scaleThreshold()
            .domain([0.2 * max, 0.4 * max, 0.6 * max, 0.8 * max])
            .range([0.3, 0.45, 0.6, 0.75, 0.9]),
        thresholdAbsolute:
          d3.scaleThreshold()
          .domain([500, 5000, 20000, 500000])
          .range([0.3, 0.45, 0.6, 0.75, 0.9]),
        linear:
          d3.scaleLinear()
            .domain([min, max])
            .range([0.2, 0.9]),
        linearAbsolute:
          d3.scaleLinear()
            .domain([0, 365])
            .range([0.2, 0.9])
      }
    };

    return scales[category][type];
  };

export const overviews = {
  intro: <p>The colors of petals, numbers of petal layers, and numbers of roots relate straightforwardly, one-to-one, to characteristics of each repository.  However, the scales governing the relationships from a repository's active lifespan to stem height and from a repository's code volume to flower size deserve a bit more explanation. Here, we've created a simple playground where you can manipulate sample data. As you read about our decisions, keep in mind that the scales we are talking about determine a relationship between data and visual medium. Specifically, the two scales we used determine the relationships between numerical data and the size of certain objects on your screen</p>,
  stems: <>
    <p>In the D3 visualization library that we used to build this project, there are a number of discrete and continuous scales to choose from. Above, you'll see several stems displayed useing the Quantize scale, which converts a range of continuous data (e.g. the active life of a repository) and maps that data to a list of discrete values. We found that this scale was flexible in representing GitHub accounts with a wide variety of repository active life distributions without diluting the differences between repositories or making gardens with significant outliers unintelligible. That said, a different scale may have been more suitable if we had intended to highlight differences between the repositiories of multiple users rather than the internal differences in a single GitHub account.</p>
    <p>Interact with the inputs below to see how a different scale might work, or how different data could present itself.</p>
  </>,
  flowers: <>
    <p>Similarly, we used the Quantize scale to govern the size of each flower based on the total volume of code in a repository.</p>
    <p>Interact with these inputs to see how the sizes of the flowers change with a different scale or altered code volumes.</p>
  </>
}

export const scaleExplanations = {
  stems: {
    quantize: <p>The quantize scale breaks a range of possible values up into chunks and represents all the data that falls into a particular chunk with the same discrete value. In other words, a repo that is 1 day older than another may be represented by a flower that is no taller than the other, because they're both in the same "chunk". In this case, the quantize scale has 8 potential stem heights at intervals of 50 pixels. Because you have selected the relative version of the scale, it breaks up the data dynamically based on the minimum and maximum values. For instance, the tallest flower for a dataset whose maximum in 80 days will be the same height as the tallest flower for a dataset with a maximum of 1000 days, because the scale is determined proportionally</p>,
    quantizeAbsolute: <p>The quantize scale breaks a range of possible values up into chunks and represents all the data that falls into a particular chunk with the same discrete value. In other words, a repo that is 1 day older than another may be represented by a flower that is no taller than the other, because they're both in the same "chunk". In this case, the quantize scale has 8 potential stem heights at intervals of 50 pixels. Because you have selected the absolute version of the scale, it breaks up the range 0-365 the same way no matter the dataset. So a dataset with lifespans all between 1 and 5 will only have very short stems, and a dataset with values between 250 and 300 will only have very tall stems.</p>,
    threshold: <p>The threshold scale breaks up a range of values based on set thresholds (e.g. everything under 100 corresponds to one discrete value, everything over 100 corresponds to another). In this case, the scale has 4 defined thresholds allowing for 5 possible stem heights. Because you have selected the relative version of the scale, the thresholds are defined proportionally to the data (every repo with an active life less than 20% of the maximum has one height, every repo with an active life between 20% and 40% of the maximum has another height, and so on).</p>,
    thresholdAbsolute: <p>The threshold scale breaks up a range of values based on set thresholds (e.g. everything under 100 corresponds to one discrete value, everything over 100 corresponds to another). In this case, the scale has 4 defined thresholds allowing for 5 possible stem heights. Because you have selected the absolute version of the scale, the thresholds are defined the same way for every set of repositories. No matter what the range of the particular data set, an active lifespan below 10 days corresponds to one height, an active lifespan between 10 and 30 days corresponds to another, and so on.</p>,
    linear: <p>A linear scale should sound more familiar. It maps continous values to a continuous values based on a constant ratio. Because you selected the relative version of this scale, the ratio (slope) of the linear scale is determined anew for each dataset based on that dataset's maximum and minimum values. All gardens have heights between 50 and 350 pixels, but whether 1 day corresponds to 5 pixels or 100 pixels depends on the data. If all repos are between 0 and 3 days old, each day will correspond to 100 pixels, whereas if repos range from 0 to 100 days old, each day will correspond to 3 pixels.</p>,
    linearAbsolute: <p>A linear scale maps continous values to a continuous values based on a constant ratio. Because you selected the absolute version of this scale, the ratio (slope) of the linear scale is set, the same for all datasets. A 0 day lifespan corresponds to a flower that is </p>
  },
  flowers: {
    quantize: <p>The quantize scale breaks a range of possible values up into chunks and represents all the data that falls into a particular chunk with the same discrete value. In other words, a repo that is 1 day older than another may be represented by a flower that is no taller than the other, because they're both in the same "chunk". In this case, the quantize scale has 8 potential stem heights at intervals of 50 pixels. Because you have selected the relative version of the scale, it breaks up the data dynamically based on the minimum and maximum values. For instance, the tallest flower for a dataset whose maximum in 80 days will be the same height as the tallest flower for a dataset with a maximum of 1000 days, because the scale is determined proportionally</p>,
    quantizeAbsolute: <p>The quantize scale breaks a range of possible values up into chunks and represents all the data that falls into a particular chunk with the same discrete value. In other words, a repo that is 1 day older than another may be represented by a flower that is no taller than the other, because they're both in the same "chunk". In this case, the quantize scale has 8 potential stem heights at intervals of 50 pixels. Because you have selected the absolute version of the scale, it breaks up the range 0-365 the same way no matter the dataset. So a dataset with lifespans all between 1 and 5 will only have very short stems, and a dataset with values between 250 and 300 will only have very tall stems.</p>,
    threshold: <p>The threshold scale breaks up a range of values based on set thresholds (e.g. everything under 100 corresponds to one discrete value, everything over 100 corresponds to another). In this case, the scale has 4 defined thresholds allowing for 5 possible stem heights. Because you have selected the relative version of the scale, the thresholds are defined proportionally to the data (every repo with an active life less than 20% of the maximum has one height, every repo with an active life between 20% and 40% of the maximum has another height, and so on).</p>,
    thresholdAbsolute: <p>The threshold scale breaks up a range of values based on set thresholds (e.g. everything under 100 corresponds to one discrete value, everything over 100 corresponds to another). In this case, the scale has 4 defined thresholds allowing for 5 possible stem heights. Because you have selected the absolute version of the scale, the thresholds are defined the same way for every set of repositories. No matter what the range of the particular data set, an active lifespan below 10 days corresponds to one height, an active lifespan between 10 and 30 days corresponds to another, and so on.</p>,
    linear: <p>A linear scale should sound more familiar. It maps continous values to a continuous values based on a constant ratio. Because you selected the relative version of this scale, the ratio (slope) of the linear scale is determined anew for each dataset based on that dataset's maximum and minimum values. All gardens have heights between 50 and 350 pixels, but whether 1 day corresponds to 5 pixels or 100 pixels depends on the data. If all repos are between 0 and 3 days old, each day will correspond to 100 pixels, whereas if repos range from 0 to 100 days old, each day will correspond to 3 pixels.</p>,
    linearAbsolute: <p>A linear scale maps continous values to a continuous values based on a constant ratio. Because you selected the absolute version of this scale, the ratio (slope) of the linear scale is set, the same for all datasets. A 0 day lifespan corresponds to a flower that is </p>
  }
}
