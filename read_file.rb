module ReadFile
  def read_file(filename)
    file = open(filename)
    content = file.read.chop # Read file and remove the EOF character
    file.close
    content
  end
end
