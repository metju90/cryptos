import { UserInputError, ApolloError } from "apollo-server";
import exchangeQuery from "../exchangeQuery/exchangeQuery";
import exchanges from "../exchanges";

interface IExchangeQueryArgs {
  amount: number
}

const resolvers = {
  Query: {
    exchangeQuery: async (_: any, args: IExchangeQueryArgs) => {
      const { amount } = args;
      if (amount <= 0) {
        throw new UserInputError(`Amount must be a positive number.`);
      }
      const data = await exchangeQuery({ btcAmount: amount, exchanges });

      if (data.hasErrors) {
        throw new ApolloError("Service Unavailable", "503");
      }

      return data;
    },
  },
};

export default resolvers;
