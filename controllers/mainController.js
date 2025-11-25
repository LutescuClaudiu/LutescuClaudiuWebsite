export const homePage = (req, res) => {
  res.render("index", {
    title: "Welcome to My Portfolio",
  });
};

export const tictactoe = (req, res) => {
  res.render("tictactoe", { title: "Play Tic Tac Toe" });
};
