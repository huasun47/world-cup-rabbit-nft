const text = `
      We understand that being flexible in the ever-changing crypto space requires familiarity with Web3 and blockchain technologies and related creative tools. \n\r
       Since the advent of Bitcoin in 2008 to today, Bitcoin has experienced a 14-year cycle, from $0.001 to the highest $69,000, tens of millions of times no one thought. \n\r
       The trend of blockchain is undoubtedly able to change everyone, a lot of people are asking where the next outlet will be, in people do not know how to choose the direction,NFT outlet is coming out, no one knows what the trend of NFT is. \n\r
       Talk about boring ape, all the NFT is from the smallest base to the highest profit space,
       who do not care how this is a method of operation, to remember the power of capital,

       the power of consensus is unlimited! What is our platform, is a trend that can change the future, this year's World Cup is coming, every bunny represents every country,
       All represent the football players dream of the World Cup,
       
       and then next year's Year of the Rabbit is coming,with the harvest of the Year of the Rabbit, the Year of the Rabbit auspicious, in the World Cup and the Year of the Rabbit, our map will be more and more valuable! 
`;

const Home = () => {
  return (
    <div className="p-4 flex-1 heng-bg bg-auto sm:bg-contain sm:bg-bottom">
      <div className="shadow-xl bg-white p-8 mb-32 rounded-lg w-11/12 sm:w-9/12 m-auto">
        <p className="text-4xl font-bold">Our Story</p>
        <section className="text-lg sm:text-2xl whitespace-pre-line">
          {text}
        </section>
      </div>
    </div>
  );
};

export default Home;
