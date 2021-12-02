def manhattan_distance(input)
  max_steps_in_circle(input.to_i) - distance_to_corner(input.to_i)
end

def is_corner(input)
  return true if is_perfect_square?(input) && Math.sqrt(input).to_i.odd? # bottom right corner
  return true if is_perfect_square?(input - 1) && Math.sqrt(input -1).to_i.even? # top left corner
  return true if upper_perfect_square(input) - input == input - lower_perfect_square(input) - 1 ## bottom left or upper right corner
  false
end

def is_perfect_square?(input)
  Math.sqrt(input).round == Math.sqrt(input)
end

def upper_perfect_square(input)
  Math.sqrt(input).ceil.pow(2)
end

def lower_perfect_square(input)
  Math.sqrt(input).floor.pow(2)
end

def max_steps_in_circle(input)
  square = Math.sqrt(input).ceil.odd? ? Math.sqrt(input).ceil : Math.sqrt(input).ceil + 1
  square - 1
end

def distance_to_corner(input)
  distance = 0

  until is_corner(input + distance) || is_corner(input - distance) do
    distance += 1
  end

  distance
end

puts manhattan_distance(ARGV[0])
