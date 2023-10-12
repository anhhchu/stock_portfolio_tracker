import request from 'supertest';
import express from 'express';
import { savePortfolio, calculateTransaction, calculatePortfolio } from './portfolio.js';
import dotenv from 'dotenv';

dotenv.config();

describe('Test the calculateTransaction function', () => {
    test('It should correctly calculate transaction values', () => {
        const result = calculateTransaction(10, 100, 150);
        expect(result).toEqual({
            price: 150,
            costBasic: 1000,
            totalValue: 1500,
            totalGainLoss: 500,
            percentGainLoss: 50
        });
    });
});

describe('Test the calculatePortfolio function with new symbol', () => {
    test('It should correctly calculate portfolio values', () => {
        const portfolioItem = {
            price: null,
            totalQuantity: 0,
            totalCostBasic: 0,
            totalValue: 0,
            totalGainLoss: 0,
            averagePercentGainLoss: 0
        };
        const result = calculatePortfolio(portfolioItem, 10, 1000, 1500, 500, 150);
        expect(result).toEqual({
            price: 150,
            totalQuantity: 10,
            totalCostBasic: 1000,
            totalValue: 1500,
            totalGainLoss: 500,
            averagePercentGainLoss: 50
        });
    });
});


describe('Test the calculatePortfolio function with existing symbol', () => {
    test('It should correctly calculate portfolio values', () => {
        const portfolioItem = {
            price: 130,
            totalQuantity: 20,
            totalCostBasic: 2000,
            totalValue: 2600,
            totalGainLoss: 600,
            averagePercentGainLoss: 30
        };
        const result = calculatePortfolio(portfolioItem, 10, 1000, 1500, 500, 150);
        expect(result).toEqual({
            price: 150,
            totalQuantity: 30,
            totalCostBasic: 3000,
            totalValue: 4100,
            totalGainLoss: 1100,
            averagePercentGainLoss: 36.6667
        });
    });
});

describe('Test the savePortfolio function', () => {
    test('It should respond with a status code of 201', async () => {
        const response = await request('http://localhost:1337')
            .post('/portfolio/64f426cb5af6a11b07ae8f0e')
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .set('Content-Type', 'application/json')
            .send({
                symbol: 'ABBV',
                date:'2023-01-03',
                quantity: '5',
                costPerShare: '100'
            });
        expect(response.statusCode).toBe(201);
    });
});
