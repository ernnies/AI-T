// SPDX-License-Identifier: MIT
use starknet::ContractAddress;

#[starknet::interface]
pub trait ILiquidationPrediction<TContractState> {
    fn add_prediction(
        ref self: TContractState,
        liquidity_pool: ContractAddress,
        debt_token: ContractAddress,
        debt_amount: u256,
        collat_token: ContractAddress,
        collat_amount: u256,
        predicted_liquidation_date: u256
    ) -> u256;
}

#[starknet::contract]
mod LiquidationPrediction {
    use starknet::ContractAddress;
    use starknet::storage::{Map, Vec, MutableVecTrait, StoragePathEntry, StoragePointerWriteAccess};
    use core::starknet::get_caller_address;

    #[derive(Drop, Serde, starknet::Store)]
    struct Prediction {
        liquidity_pool: ContractAddress,
        debt_token: ContractAddress,
        debt_amount: u256,
        collat_token: ContractAddress,
        collat_amount: u256,
        predicted_liquidation_date: u256,  // stored as a timestamp
    }

    #[storage]
    struct Storage {
        predictions: Map<ContractAddress, Vec<Prediction>>,
        prediction_counter: u256,
    }

    #[abi(embed_v0)]
    impl LiquidationPredictionImpl of super::ILiquidationPrediction<ContractState> {
        fn add_prediction(
            ref self: ContractState,
            liquidity_pool: ContractAddress,
            debt_token: ContractAddress,
            debt_amount: u256,
            collat_token: ContractAddress,
            collat_amount: u256,
            predicted_liquidation_date: u256
        )
