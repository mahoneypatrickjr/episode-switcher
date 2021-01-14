import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import EpisodeSwitcherContainer from "./episode-switcher/EpisodeSwitcherContainer";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EpisodeSwitcherContainer />
    </QueryClientProvider>
  );
};

export default App;
