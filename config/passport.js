const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

module.exports = function configurePassport(passport, prisma) {
  passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {email: email},
                });

                if (!user) {
                    return done(null, false, {message: "Incorect email"});
                }

                const match = await bcrypt.compare(password, user.password);
                if(!match) {
                    return done(null, false, {message: "Incorrect password"});
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id: id},
        });
        return done(null, user || false);
    } catch (err) {
        return done(err)
    }
  });
};