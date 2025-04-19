import { readFileSync } from "node:fs";

const data: string[] = readFileSync('day5/input.txt').toString('utf-8').split('\n').filter((line) => line)

const seeds = data[0].split('seeds: ')[1].split(' ').map((val) => Number(val))
const seedToSoilMap = data.slice(data.indexOf('seed-to-soil map:') + 1, data.indexOf('soil-to-fertilizer map:'))
const soilToFertilizerMap = data.slice(data.indexOf('soil-to-fertilizer map:') + 1, data.indexOf('fertilizer-to-water map:'))
const fertilzerToWaterMap = data.slice(data.indexOf('fertilizer-to-water map:') + 1, data.indexOf('water-to-light map:'))
const waterToLightMap = data.slice(data.indexOf('water-to-light map:') + 1, data.indexOf('light-to-temperature map:'))
const lightToTemperatureMap = data.slice(data.indexOf('light-to-temperature map:') + 1, data.indexOf('temperature-to-humidity map:'))
const temperatureToHumidityMap = data.slice(data.indexOf('temperature-to-humidity map:') + 1, data.indexOf('humidity-to-location map:'))
const humityToLocationMap = data.slice(data.indexOf('humidity-to-location map:') + 1, data.length)

let lowestLocation = 0;

const mapLookup = ((lookupNumber: number, map: string[]) => {
  for (const mapNumber of map) {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = mapNumber.split(' ').map((val) => Number(val))
    if (sourceRangeStart <= lookupNumber && sourceRangeStart + rangeLength > lookupNumber) {
      return lookupNumber + destinationRangeStart - sourceRangeStart
    }
  }

  return lookupNumber
})

for (const seed of seeds) {
  const soil = (mapLookup(seed, seedToSoilMap))
  const fertilizer = (mapLookup(soil, soilToFertilizerMap))
  const water = (mapLookup(fertilizer, fertilzerToWaterMap))
  const light = (mapLookup(water, waterToLightMap))
  const temperature = (mapLookup(light, lightToTemperatureMap))
  const humidity = (mapLookup(temperature, temperatureToHumidityMap))
  const location = (mapLookup(humidity, humityToLocationMap))

  if (lowestLocation === 0) {
    lowestLocation = location
  } else if (location < lowestLocation) {
    lowestLocation = location
  }
}

console.log(lowestLocation)
